// app/api/log-visit/route.ts
import { NextRequest, NextResponse } from 'next/server'

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

const logToAPI = async (
  origin: string,
  level: 'INFO' | 'WARN' | 'ERROR',
  message: string,
  data?: Record<string, unknown>,
  context: string = 'PageVisit',
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
    console.error('Failed to log to main API:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      path,
      locale,
      userAgent,
      referrer,
      timestamp,
      screen,
      viewport,
      language,
      languages,
      cookieEnabled,
      onLine,
      platform,
      loadTime,
      sessionId,
      additionalData = {},
    } = body

    // Get IP address from request headers
    const ip = getClientIP(request)

    // Get additional server-side data
    const serverData = {
      ip,
      serverTimestamp: new Date().toISOString(),
      headers: {
        'user-agent': request.headers.get('user-agent'),
        accept: request.headers.get('accept'),
        'accept-language': request.headers.get('accept-language'),
        'accept-encoding': request.headers.get('accept-encoding'),
        connection: request.headers.get('connection'),
        host: request.headers.get('host'),
        origin: request.headers.get('origin'),
        referer: request.headers.get('referer'),
      },
    }

    // Combine client and server data
    const logData = {
      // Client-side data
      path,
      locale,
      userAgent,
      referrer,
      timestamp,
      screen,
      viewport,
      language,
      languages,
      cookieEnabled,
      onLine,
      platform,
      loadTime,
      sessionId,

      // Server-side data with IP
      ...serverData,

      // Any additional data
      ...additionalData,
    }

    // Log to your main logging API
    const origin = request.nextUrl.origin
    await logToAPI(origin, 'INFO', `Page visit: ${path}`, logData, 'PageVisit')

    return NextResponse.json({
      success: true,
      ip, // Optionally return IP to client for debugging
      timestamp: serverData.serverTimestamp,
    })
  } catch (error) {
    console.error('Error in log-visit API:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to log page visit',
      },
      { status: 500 },
    )
  }
}
