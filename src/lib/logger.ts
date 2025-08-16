import { promises as fs } from 'fs'
import path from 'path'

enum LogLevel {
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
  userId?: string
  error?: {
    name: string
    message: string
    stack?: string
  }
}

export interface LoggerConfig {
  level: LogLevel
  enableConsole: boolean
  enableFile: boolean
  format: 'json' | 'pretty'
  context?: string
}

class CustomLogger {
  private config: LoggerConfig
  private requestId?: string
  private userId?: string

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      level:
        process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG,
      enableConsole: process.env.NODE_ENV === 'production' ? false : true,
      enableFile: true,
      format: 'json',
      ...config,
    }
  }

  setContext(context: string): CustomLogger {
    return new CustomLogger({ ...this.config, context })
  }

  setRequestId(requestId: string): CustomLogger {
    const newLogger = new CustomLogger(this.config)
    newLogger.requestId = requestId
    newLogger.userId = this.userId
    return newLogger
  }

  setUserId(userId: string): CustomLogger {
    const newLogger = new CustomLogger(this.config)
    newLogger.requestId = this.requestId
    newLogger.userId = userId
    return newLogger
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.config.level
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    data?: Record<string, unknown>,
    error?: Error,
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      context: this.config.context,
      requestId: this.requestId,
      userId: this.userId,
      error: error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : undefined,
    }
  }

  private formatMessage(entry: LogEntry): string {
    if (this.config.format === 'json') {
      return JSON.stringify(entry)
    }

    const levelColors = {
      [LogLevel.DEBUG]: '\x1b[36m',
      [LogLevel.INFO]: '\x1b[32m',
      [LogLevel.WARN]: '\x1b[33m',
      [LogLevel.ERROR]: '\x1b[31m',
      [LogLevel.FATAL]: '\x1b[35m',
    }

    const levelNames = {
      [LogLevel.DEBUG]: 'DEBUG',
      [LogLevel.INFO]: 'INFO',
      [LogLevel.WARN]: 'WARN',
      [LogLevel.ERROR]: 'ERROR',
      [LogLevel.FATAL]: 'FATAL',
    }

    const reset = '\x1b[0m'
    const color = levelColors[entry.level]
    const levelName = levelNames[entry.level]

    let formatted = `${color}[${levelName}]${reset} ${entry.timestamp}`

    if (entry.context) formatted += ` [${entry.context}]`
    if (entry.requestId) formatted += ` [req:${entry.requestId.slice(0, 8)}]`
    if (entry.userId) formatted += ` [user:${entry.userId}]`

    formatted += ` ${entry.message}`

    if (entry.data)
      formatted += `\n  Data: ${JSON.stringify(entry.data, null, 2)}`
    if (entry.error?.stack) formatted += `\n  Stack: ${entry.error.stack}`

    return formatted
  }

  private async writeLog(entry: LogEntry): Promise<void> {
    if (!this.shouldLog(entry.level)) return

    const formatted = this.formatMessage(entry)

    if (this.config.enableConsole) {
      const consoleMethods = {
        [LogLevel.DEBUG]: console.debug,
        [LogLevel.INFO]: console.info,
        [LogLevel.WARN]: console.warn,
        [LogLevel.ERROR]: console.error,
        [LogLevel.FATAL]: console.error,
      }
      consoleMethods[entry.level](formatted)
    }

    if (this.config.enableFile) {
      await this.writeToFile(entry)
    }
  }

  private async writeToFile(entry: LogEntry): Promise<void> {
    try {
      const logDir = path.join(process.cwd(), 'logs')
      await fs.mkdir(logDir, { recursive: true })
      const logFile = path.join(
        logDir,
        `app-${new Date().toISOString().split('T')[0]}.log`,
      )
      await fs.appendFile(logFile, JSON.stringify(entry) + '\n')
    } catch (error) {
      console.error('Failed to write log to file:', error)
    }
  }

  debug(message: string, data?: Record<string, unknown>): void {
    this.writeLog(this.createLogEntry(LogLevel.DEBUG, message, data))
  }

  info(message: string, data?: Record<string, unknown>): void {
    this.writeLog(this.createLogEntry(LogLevel.INFO, message, data))
  }

  warn(message: string, data?: Record<string, unknown>): void {
    this.writeLog(this.createLogEntry(LogLevel.WARN, message, data))
  }

  error(message: string, error?: unknown): void {
    const err =
      error instanceof Error
        ? error
        : error
          ? new Error(JSON.stringify(error))
          : undefined
    this.writeLog(this.createLogEntry(LogLevel.ERROR, message, undefined, err))
  }

  fatal(message: string, error?: unknown): void {
    const err =
      error instanceof Error
        ? error
        : error
          ? new Error(JSON.stringify(error))
          : undefined
    this.writeLog(this.createLogEntry(LogLevel.FATAL, message, undefined, err))
  }
}

const logger = new CustomLogger()
export default logger
