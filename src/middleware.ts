// middleware.ts
import { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/lib/i18n/routing'
import { v4 as uuidv4 } from 'uuid'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  // Run next-intl first
  const response = intlMiddleware(request)

  let sessionId = request.cookies.get('sessionId')?.value
  if (!sessionId) {
    sessionId = uuidv4()
    response.cookies.set({
      name: 'sessionId',
      value: sessionId,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next|.*\\.(?:png|jpg|jpeg|svg|webp|ico|txt|css|js)).*)'],
}
