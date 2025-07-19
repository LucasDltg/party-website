// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { adminAuth } from './src/lib/firebase/firebaseAdmin'

const locales = ['en', 'fr']
const defaultLocale = 'en'

// Detect user-preferred locale from request headers
function getLocale(request: NextRequest) {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value
  })

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  return match(languages, locales, defaultLocale)
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // --- 1. Locale Detection and Redirection ---
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (!pathnameHasLocale) {
    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(request.nextUrl)
  }

  // --- 2. Auth + Role Middleware for /admin routes ---
  if (pathname.includes('/admin')) {
    const token = request.cookies.get('token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/auth', request.url))
    }

    try {
      const decodedToken = await adminAuth.verifyIdToken(token)
      const role = decodedToken.role

      if (pathname.includes('/admin') && role !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', request.url))
      }
    } catch {
      return NextResponse.redirect(new URL('/auth', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next|favicon.ico).*)', // Apply locale redirection to all except internal paths
    '/admin/:path*', // Apply auth logic to admin pages
  ],
}
