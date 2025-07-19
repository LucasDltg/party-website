// src/app/api/login/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { token } = body

    if (!token) {
      return NextResponse.json({ error: 'Token missing' }, { status: 400 })
    }

    // Set httpOnly cookie using nookies
    // nookies expects a Next.js response object, but in app router
    // you can set cookies with NextResponse directly

    const response = NextResponse.json({ message: 'Logged in' })

    // Set cookie manually (httpOnly, secure, maxAge 1 hour)
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    })

    return response
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
