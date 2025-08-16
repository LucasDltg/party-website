import { NextRequest, NextResponse } from 'next/server'
import logger from '@/lib/logger'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { level, message, data, context, requestId, userId } = body

    const log = logger
      .setContext(context ?? 'Middleware')
      .setRequestId(requestId ?? undefined)
      .setUserId(userId ?? undefined)

    switch (level) {
      case 'DEBUG':
        log.debug(message, data)
        break
      case 'INFO':
        log.info(message, data)
        break
      case 'WARN':
        log.warn(message, data)
        break
      case 'ERROR':
        log.error(message, data)
        break
      case 'FATAL':
        log.fatal(message, data)
        break
      default:
        log.info(message, data)
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
