// lib/firebase/withAuth.ts
import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from './firebaseAdmin'

export type AuthenticatedHandler<Context> = (
  req: NextRequest,
  context: Context,
  user: { uid: string; email?: string },
) => Promise<NextResponse>

export function withAuth<Context>(handler: AuthenticatedHandler<Context>) {
  return async (req: NextRequest, context: Context) => {
    const token = req.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    try {
      const decodedToken = await adminAuth.verifyIdToken(token)

      return handler(req, context, {
        uid: decodedToken.uid,
        email: decodedToken.email,
      })
    } catch (error) {
      console.error('Token verification failed:', error)
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }
  }
}
