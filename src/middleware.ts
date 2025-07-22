// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { isValidLocale, isExistingPage } from '@/config/i18n'
import { getLocale } from './lib/locale/locale'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  console.log('Middleware - pathname:', pathname)

  // Handle root redirect
  if (pathname === '/') {
    // Use user's preferred locale or default
    const preferredLocale = getLocale(request)
    console.log('Root redirect to preferred locale:', preferredLocale)
    return NextResponse.redirect(new URL(`/${preferredLocale}`, request.url))
  }

  // Check if path starts with a supported language
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]

  console.log('Detected first segment:', firstSegment)

  // If first segment is a supported language, let it through
  if (isValidLocale(firstSegment)) {
    console.log('Valid language route:', pathname)
    return NextResponse.next()
  }

  // If first segment matches an existing page, redirect to preferred language + page
  if (isExistingPage(firstSegment)) {
    const preferredLocale = getLocale(request)
    const newUrl = `/${preferredLocale}${pathname}`
    console.log('Redirecting to preferred locale:', newUrl)
    return NextResponse.redirect(new URL(newUrl, request.url))
  }

  // Check for nested routes (e.g., /auth/login -> /[preferredLang]/auth/login)
  if (segments.length > 0 && isExistingPage(segments[0])) {
    const preferredLocale = getLocale(request)
    const newUrl = `/${preferredLocale}${pathname}`
    console.log('Redirecting nested route to preferred locale:', newUrl)
    return NextResponse.redirect(new URL(newUrl, request.url))
  }

  // If no match found, redirect to preferred locale home
  const preferredLocale = getLocale(request)
  console.log('Rewriting to hidden 404 page')
  return NextResponse.rewrite(
    new URL(`/${preferredLocale}/not-found`, request.url),
  )

  // console.log(pathname, pathLocale)

  // // If the pathname includes a locale but it's not supported, rewrite to /404
  // const isPrefixedWithSomething = pathname.startsWith(`/${pathLocale}`);
  // const isInvalidLocale = isPrefixedWithSomething && !locales.includes(pathLocale);

  // console.log(isInvalidLocale)

  // if (isInvalidLocale) {
  // return NextResponse.rewrite(new URL('/404', request.url));
  // }

  // // --- 1. Locale Detection and Redirection ---
  // const pathnameHasLocale = locales.some(
  //   (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  // )

  // console.log(pathnameHasLocale)

  // if (!pathnameHasLocale) {
  //   const locale = getLocale(request)
  //   request.nextUrl.pathname = `/${locale}${pathname}`
  //   return NextResponse.redirect(request.nextUrl)
  // }

  // // --- 2. Auth + Role Middleware for /admin routes ---
  // if (pathname.includes('/admin')) {
  //   const token = request.cookies.get('token')?.value

  //   if (!token) {
  //     return NextResponse.redirect(new URL('/auth', request.url))
  //   }

  // try {
  //   const decodedToken = await adminAuth.verifyIdToken(token)
  //   const role = decodedToken.role

  //   if (pathname.includes('/admin') && role !== 'admin') {
  //     return NextResponse.redirect(new URL('/unauthorized', request.url))
  //   }
  // } catch {
  //   return NextResponse.redirect(new URL('/auth', request.url))
  // }
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|.*\\.(?:png|jpg|jpeg|svg|webp|ico|txt|css|js)).*)'],
}
