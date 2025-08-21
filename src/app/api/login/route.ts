// src/app/api/login/route.ts
import { NextResponse, NextRequest } from 'next/server'
import logger, { getSessionIdFromCookies } from '@/lib/logger'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    const sessionId = await getSessionIdFromCookies(request)
    const log = logger.createRequestLogger(sessionId, 'Logging API')

    if (!token) {
      return NextResponse.json({ error: 'Token missing' }, { status: 400 })
    }

    const response = NextResponse.json({ message: 'Logged in' })
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hour
      path: '/',
      sameSite: 'lax',
    })

    log.info('User logged in successfully')

    return response
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
