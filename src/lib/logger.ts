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
  context?: string
}

type LogListener = (entry: LogEntry) => void

class CustomLogger {
  private config: LoggerConfig
  private requestId?: string
  private userId?: string
  private maxEntries: number
  private static buffer: LogEntry[] = []
  private static listeners: Set<LogListener> = new Set()

  constructor(config: Partial<LoggerConfig> = {}, maxEntries = 100) {
    this.config = {
      level:
        process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG,
      enableConsole: true,
      ...config,
    }

    this.maxEntries = maxEntries
  }

  setContext(context: string): CustomLogger {
    const newLogger = new CustomLogger(this.config, this.maxEntries)
    newLogger.requestId = this.requestId
    newLogger.userId = this.userId
    newLogger.config.context = context
    return newLogger
  }

  setRequestId(requestId: string): CustomLogger {
    const newLogger = new CustomLogger(this.config, this.maxEntries)
    newLogger.requestId = requestId
    newLogger.userId = this.userId
    return newLogger
  }

  setUserId(userId: string): CustomLogger {
    const newLogger = new CustomLogger(this.config, this.maxEntries)
    newLogger.requestId = this.requestId
    newLogger.userId = userId
    return newLogger
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
        ? { name: error.name, message: error.message, stack: error.stack }
        : undefined,
    }
  }

  private addToBuffer(entry: LogEntry) {
    CustomLogger.buffer.push(entry)
    if (CustomLogger.buffer.length > this.maxEntries) {
      CustomLogger.buffer.shift()
    }
  }

  private async writeLog(entry: LogEntry): Promise<void> {
    if (!this.shouldLog(entry.level)) return

    const json = JSON.stringify(entry)

    if (this.config.enableConsole) {
      if (entry.level >= LogLevel.ERROR) {
        console.error(json) // stderr
      } else {
        console.log(json) // stdout
      }
    }

    this.addToBuffer(entry)
    CustomLogger.listeners.forEach((listener) => listener(entry))
  }

  async getLastLogs(): Promise<LogEntry[]> {
    return [...CustomLogger.buffer]
  }

  debug(message: string, data?: Record<string, unknown>) {
    this.writeLog(this.createLogEntry(LogLevel.DEBUG, message, data))
  }

  info(message: string, data?: Record<string, unknown>) {
    this.writeLog(this.createLogEntry(LogLevel.INFO, message, data))
  }

  warn(message: string, data?: Record<string, unknown>) {
    this.writeLog(this.createLogEntry(LogLevel.WARN, message, data))
  }

  error(message: string, error?: unknown) {
    const err =
      error instanceof Error
        ? error
        : error
          ? new Error(JSON.stringify(error))
          : undefined
    this.writeLog(this.createLogEntry(LogLevel.ERROR, message, undefined, err))
  }

  fatal(message: string, error?: unknown) {
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
