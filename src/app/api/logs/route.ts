import { NextRequest, NextResponse } from 'next/server'
import logger, { LogLevel, getSessionIdFromCookies } from '@/lib/logger'

export type LogInput = {
  level: LogLevel
  message: string
  data?: Record<string, unknown>
  error?: unknown
  context?: string
  includeServerData?: boolean
}

export async function POST(request: NextRequest) {
  try {
    const body: LogInput = await request.json()

    // Use cookie value as sessionId if not provided
    const sessionId = await getSessionIdFromCookies(request)

    // Add server data if requested
    if (body.includeServerData) {
      const serverData = {
        ip:
          request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
          request.headers.get('x-real-ip')?.trim() ||
          request.headers.get('cf-connecting-ip')?.trim() ||
          request.headers.get('x-client-ip')?.trim() ||
          'unknown',
        serverTimestamp: new Date().toISOString(),
        headers: {
          'user-agent': request.headers.get('user-agent'),
          accept: request.headers.get('accept'),
          'accept-language': request.headers.get('accept-language'),
          connection: request.headers.get('connection'),
          host: request.headers.get('host'),
          origin: request.headers.get('origin'),
          referer: request.headers.get('referer'),
        },
      }

      body.data = {
        ...body.data,
        server: serverData,
      }
    }

    const log = logger.createRequestLogger(sessionId, body.context)

    switch (body.level) {
      case LogLevel.DEBUG:
        log.debug(body.message, body.data)
        break
      case LogLevel.INFO:
        log.info(body.message, body.data)
        break
      case LogLevel.WARN:
        log.warn(body.message, body.data)
        break
      case LogLevel.ERROR:
        log.error(body.message, body.error)
        break
      case LogLevel.FATAL:
        log.fatal(body.message, body.error)
        break
      default:
        log.info(body.message, body.data)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Failed to log from API:', err)
    return NextResponse.json(
      { success: false, error: 'Failed to log' },
      { status: 500 },
    )
  }
}

import { pool } from '@/lib/db'
import { LogEntry } from '@/lib/logger'
import { withAPIProtected } from '@/lib/firebase/withAPIProtected'

interface LogRow extends Omit<LogEntry, 'timestamp'> {
  timestamp: Date
}

export const GET = withAPIProtected(
  async (request) => {
    try {
      const limitParam = request.nextUrl.searchParams.get('limit')
      const safeLimit = Math.min(
        Math.max(parseInt(limitParam as string) || 10, 1),
        1000,
      ) // 1–1000

      const res = await pool.query(
        'SELECT * FROM logs ORDER BY timestamp DESC LIMIT ?',
        [safeLimit],
      )

      const logs = (res as LogRow[]).map((row) => ({
        ...row,
        timestamp: row.timestamp.toISOString(),
      }))

      return NextResponse.json(logs)
    } catch (err) {
      console.error('Failed to fetch logs:', err)
      return NextResponse.json(
        { error: 'Failed to fetch logs' },
        { status: 500 },
      )
    }
  },
  { requiredRole: 'admin' },
)
