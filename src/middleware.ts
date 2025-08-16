// middleware.ts
import { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/lib/i18n/routing'

const intlMiddleware = createMiddleware(routing)

const getClientIP = (request: NextRequest): string => {
  // Check x-forwarded-for header (most common)
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  // Check x-real-ip header (nginx proxy)
  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP.trim()
  }

  // Check cf-connecting-ip header (Cloudflare)
  const cfIP = request.headers.get('cf-connecting-ip')
  if (cfIP) {
    return cfIP.trim()
  }

  // Check x-client-ip header (Apache)
  const clientIP = request.headers.get('x-client-ip')
  if (clientIP) {
    return clientIP.trim()
  }

  return 'unknown'
}

const getSafeURL = (request: NextRequest): string => {
  const url = new URL(request.url)
  return url.pathname + (url.search ? `?${url.search}` : '')
}

const logToAPI = async (
  origin: string,
  level: 'INFO' | 'WARN' | 'ERROR',
  message: string,
  data?: Record<string, unknown>,
  context: string = 'Middleware',
) => {
  try {
    await fetch(`${origin}/api/log`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify({
        level,
        message,
        data: {
          ...data,
        },
        context,
      }),
    })
  } catch (error) {
    console.error('Failed to log to API:', error)
    console.log(`[${level}] ${context}: ${message}`, data)
  }
}

export default async function middleware(request: NextRequest) {
  const origin = request.nextUrl.origin

  try {
    const ip = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const method = request.method
    const path = getSafeURL(request)

    // 1. Skip prefetch requests
    if (request.headers.get('purpose') === 'prefetch') {
      return intlMiddleware(request)
    }
    // 2. Skip "??" malformed duplicates
    if (path.includes('??')) {
      return intlMiddleware(request)
    }
    // 3. Optionally: only log GET navigations (ignore POST/PUT/OPTIONS)
    if (method !== 'GET') {
      return intlMiddleware(request)
    }

    // Log request information
    await logToAPI(origin, 'INFO', `Request: ${method} ${path}`, {
      ip,
      method,
      path,
      userAgent: userAgent.substring(0, 200),
    })

    const response = await intlMiddleware(request)

    return response
  } catch (error) {
    await logToAPI(origin, 'ERROR', 'Middleware execution error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      url: request.url,
      method: request.method,
    })

    return await intlMiddleware(request)
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\.(?:png|jpg|jpeg|svg|webp|ico|txt|css|js)).*)'],
}
