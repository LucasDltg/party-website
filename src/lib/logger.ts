// lib/logger.ts
import { v4 as uuidv4 } from 'uuid'
import { NextRequest } from 'next/server'
import { pool } from './db'
import axios from 'axios'

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4,
}

export interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  data?: LogData
  context?: string
  requestId?: string
  sessionId?: string
  error?: {
    name: string
    message: string
    stack?: string
  }
}

export interface LoggerConfig {
  level: LogLevel
  enableConsole: boolean
}

interface LogServerData {
  ip?: string
  serverTimestamp?: string
  headers?: Record<string, string>
}

interface LogData extends Record<string, unknown> {
  server?: LogServerData
  [key: string]: unknown
}

function ipToBinary(ip: string): Buffer {
  const isIPv4 = ip.includes('.')
  if (isIPv4) {
    return Buffer.from(ip.split('.').map((byte) => Number(byte)))
  } else {
    // IPv6
    return Buffer.from(
      ip.split(':').flatMap((part) => {
        if (part === '') return [0, 0]
        const num = parseInt(part, 16)
        return [(num >> 8) & 0xff, num & 0xff]
      }),
    )
  }
}

async function fetchIpApi(ip: string) {
  try {
    const res = await axios.get(`http://ip-api.com/json/${ip}?fields=66846719`)
    return res.data
  } catch (err) {
    console.error('Failed IP-API request', err)
    return null
  }
}

// Insert IP location into DB if not already existing
async function ensureIpLogged(ip: string) {
  if (!ip) return

  const ipBinary = ipToBinary(ip)

  interface IpRow {
    id: number
  }

  // Check if IP already exists
  const rows: IpRow[] = await pool.query(
    `SELECT id FROM ip_api_logs WHERE ip = ? LIMIT 1`,
    [ipBinary],
  )

  if (rows.length > 0) return

  // Fetch from IP-API
  const info = await fetchIpApi(ip)
  if (!info || info.status !== 'success') return

  try {
    await pool.query(
      `INSERT INTO ip_api_logs 
       (ip, ip_text, country_name, region_name, city_name, zip_code, latitude, longitude, isp)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        ipBinary,
        ip,
        info.country,
        info.regionName,
        info.city,
        info.zip,
        info.lat,
        info.lon,
        info.isp,
      ],
    )
  } catch (err) {
    console.error('Failed inserting ip_api_logs:', err)
  }
}

type LogListener = (entry: LogEntry) => void

class CustomLogger {
  private config: LoggerConfig
  private static listeners: Set<LogListener> = new Set()

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      level:
        process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG,
      enableConsole: false,
      ...config,
    }
  }

  onLog(listener: LogListener) {
    CustomLogger.listeners.add(listener)
    return () => CustomLogger.listeners.delete(listener) // unsubscribe
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.config.level
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    data?: Record<string, unknown>,
    error?: Error,
    context?: string,
    requestId?: string,
    sessionId?: string,
  ): LogEntry {
    // Generate timestamp directly in "YYYY-MM-DD HH:MM:SS" format
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ')

    return {
      timestamp,
      level,
      message,
      data,
      context: context,
      requestId: requestId,
      sessionId: sessionId,
      error: error
        ? { name: error.name, message: error.message, stack: error.stack }
        : undefined,
    }
  }

  private async writeLog(entry: LogEntry): Promise<void> {
    if (!this.shouldLog(entry.level)) return

    const json = JSON.stringify(entry)
    if (entry.level >= LogLevel.ERROR) {
      console.error(json)
    } else if (this.config.enableConsole) {
      console.log(json)
    }

    // Notify sse listeners
    CustomLogger.listeners.forEach((listener) => listener(entry))

    // Extract IP and store it
    const data = entry.data as LogData
    const ip: string | null = data.server?.ip ?? null

    if (ip) {
      await ensureIpLogged(String(ip))
    }

    // Insert into logs table
    try {
      await pool.query(
        `INSERT INTO logs 
          (timestamp, level, message, data, context, requestId, sessionId, error)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          entry.timestamp,
          entry.level,
          entry.message,
          entry.data ? JSON.stringify(entry.data) : null,
          entry.context || null,
          entry.requestId || null,
          entry.sessionId || null,
          entry.error ? JSON.stringify(entry.error) : null,
        ],
      )
    } catch (err) {
      console.error('Failed to write log to DB:', err)
    }
  }

  private debug(
    message: string,
    data?: Record<string, unknown>,
    requestId?: string,
    sessionId?: string,
    context?: string,
  ) {
    this.writeLog(
      this.createLogEntry(
        LogLevel.DEBUG,
        message,
        data,
        undefined,
        context,
        requestId,
        sessionId,
      ),
    )
  }

  private info(
    message: string,
    data?: Record<string, unknown>,
    requestId?: string,
    sessionId?: string,
    context?: string,
  ) {
    this.writeLog(
      this.createLogEntry(
        LogLevel.INFO,
        message,
        data,
        undefined,
        context,
        requestId,
        sessionId,
      ),
    )
  }

  private warn(
    message: string,
    data?: Record<string, unknown>,
    requestId?: string,
    sessionId?: string,
    context?: string,
  ) {
    this.writeLog(
      this.createLogEntry(
        LogLevel.WARN,
        message,
        data,
        undefined,
        context,
        requestId,
        sessionId,
      ),
    )
  }

  private error(
    message: string,
    error?: unknown,
    requestId?: string,
    sessionId?: string,
    context?: string,
  ) {
    const err =
      error instanceof Error
        ? error
        : error
          ? new Error(JSON.stringify(error))
          : undefined
    this.writeLog(
      this.createLogEntry(
        LogLevel.ERROR,
        message,
        undefined,
        err,
        context,
        requestId,
        sessionId,
      ),
    )
  }

  private fatal(
    message: string,
    error?: unknown,
    requestId?: string,
    sessionId?: string,
    context?: string,
  ) {
    const err =
      error instanceof Error
        ? error
        : error
          ? new Error(JSON.stringify(error))
          : undefined
    this.writeLog(
      this.createLogEntry(
        LogLevel.FATAL,
        message,
        undefined,
        err,
        context,
        requestId,
        sessionId,
      ),
    )
  }

  createRequestLogger(sessionId: string, context?: string) {
    const requestId = uuidv4()
    return {
      debug: (msg: string, data?: Record<string, unknown>) =>
        this.debug(msg, data, requestId, sessionId, context),
      info: (msg: string, data?: Record<string, unknown>) =>
        this.info(msg, data, requestId, sessionId, context),
      warn: (msg: string, data?: Record<string, unknown>) =>
        this.warn(msg, data, requestId, sessionId, context),
      error: (msg: string, err?: unknown) =>
        this.error(msg, err, requestId, sessionId, context),
      fatal: (msg: string, err?: unknown) =>
        this.fatal(msg, err, requestId, sessionId, context),
    }
  }
}

export async function getSessionIdFromCookies(
  request: NextRequest,
): Promise<string> {
  return request.cookies.get('sessionId')?.value || 'unknown-session'
}

const logger = new CustomLogger()
export default logger
