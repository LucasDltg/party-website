// lib/firebase/withAuth.ts
import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from './firebaseAdmin'

export type AuthenticatedHandler = (
  req: NextRequest,
  context: { params: Record<string, string> | undefined },
  user: { uid: string; email?: string },
) => Promise<NextResponse>

export function withAuth(handler: AuthenticatedHandler) {
  return async (
    req: NextRequest,
    context: { params: Record<string, string> | undefined },
  ) => {
    const token = req.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    try {
      const decodedToken = await adminAuth.verifyIdToken(token)

      // Pass the decoded user info to your handler
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
