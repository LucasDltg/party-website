// lib/logger.ts
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
    return {
      timestamp: new Date().toISOString(),
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

  createRequestLogger(requestId: string, sessionId: string, context?: string) {
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

const logger = new CustomLogger()
export default logger
