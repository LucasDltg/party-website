// src/app/api/login/route.ts
import { NextResponse } from 'next/server'
import logger from '@/lib/logger'
import { adminAuth } from '@/lib/firebase/firebaseAdmin'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  const requestId = uuidv4()
  const log = logger.setContext('LoginEndpoint').setRequestId(requestId)

  try {
    const { token } = await request.json()

    if (!token) {
      log.warn('Token missing in request')
      return NextResponse.json({ error: 'Token missing' }, { status: 400 })
    }

    const decodedToken = await adminAuth.verifyIdToken(token)
    const userId = decodedToken.uid
    const userLog = log.setUserId(userId)

    userLog.info(`User logged in: ${decodedToken.email ?? 'unknown email'}`)

    const response = NextResponse.json({ message: 'Logged in' })
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    })

    userLog.info('Login cookie set successfully')

    return response
  } catch (error) {
    log.error('Failed to process login', error as Error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
