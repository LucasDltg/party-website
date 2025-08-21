// lib/logger.ts
import { v4 as uuidv4 } from 'uuid'
import { NextRequest } from 'next/server'
import { pool } from './db'

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
  data?: Record<string, unknown>
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
    } else {
      console.log(json)
    }

    // Notify sse listeners
    CustomLogger.listeners.forEach((listener) => listener(entry))

    // Write to DB

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
