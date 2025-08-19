// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/lib/i18n/routing'
import { v4 as uuidv4 } from 'uuid'

const intlMiddleware = createMiddleware(routing)

export default async function middleware(request: NextRequest) {
  const res = NextResponse.next()

  const sessionId = request.cookies.get('sessionId')?.value
  if (!sessionId) {
    const newSessionId = uuidv4()

    res.cookies.set({
      name: 'sessionId',
      value: newSessionId,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })
  }

  const intlResponse = intlMiddleware(request)

  if (!sessionId) {
    intlResponse.cookies.set(res.cookies.get('sessionId')!)
  }

  return intlResponse
}

export const config = {
  matcher: ['/((?!api|_next|.*\\.(?:png|jpg|jpeg|svg|webp|ico|txt|css|js)).*)'],
}
