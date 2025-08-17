// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
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

const getSafeURL = (url: string): string => {
  const urlObj = new URL(url)
  return urlObj.pathname + (urlObj.search ? `?${urlObj.search}` : '')
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

const shouldLog = (
  request: NextRequest,
  finalPath: string,
  method: string,
): boolean => {
  // Only log GET requests
  if (method !== 'GET') return false

  // Skip root path
  if (finalPath === '/') return false

  // Skip malformed paths
  if (finalPath.includes('??')) return false

  // Only log requests that are actual user navigations
  // Check for HTML accept header (user navigations request HTML)
  const accept = request.headers.get('accept') || ''
  if (!accept.includes('text/html')) return false

  // Skip all forms of prefetch requests
  if (request.headers.get('purpose') === 'prefetch') return false
  if (request.headers.get('x-purpose') === 'prefetch') return false
  if (request.headers.get('sec-purpose') === 'prefetch') return false
  if (request.headers.get('next-router-prefetch')) return false
  if (request.headers.get('rsc') === '1') return false

  // Only log if this looks like a real user navigation
  // User navigations typically have higher priority
  const fetchPriority = request.headers.get('sec-fetch-dest')
  if (fetchPriority && fetchPriority !== 'document') return false

  return true
}

export default async function middleware(request: NextRequest) {
  const origin = request.nextUrl.origin

  try {
    const ip = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const method = request.method
    const originalPath = getSafeURL(request.url)

    // Execute intl middleware first
    const response = await intlMiddleware(request)

    // Only log if this is NOT a redirect response
    // When intl middleware redirects, it will call middleware again for the new URL
    const isRedirect =
      response instanceof NextResponse &&
      response.status >= 300 &&
      response.status < 400 &&
      response.headers.get('location')

    if (!isRedirect && shouldLog(request, originalPath, method)) {
      // This is the final request (no redirect), so log it
      await logToAPI(origin, 'INFO', `Request: ${method} ${originalPath}`, {
        ip,
        method,
        path: originalPath,
        userAgent: userAgent.substring(0, 200),
      })
    }

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
