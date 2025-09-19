// lib/firebase/withAPIProtected.ts
import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from './firebaseAdmin'
import { UserRole } from '@/types/UserRole'

export type AuthenticatedHandler<Context> = (
  req: NextRequest,
  context: Context,
) => Promise<NextResponse>

interface RoleOptions {
  requiredRole?: UserRole
  allowedRoles?: UserRole[]
}

export function withAPIProtected<Context>(
  handler: AuthenticatedHandler<Context>,
  { requiredRole, allowedRoles = [] }: RoleOptions = {},
) {
  return async (req: NextRequest, context: Context) => {
    const token = req.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    try {
      const decodedToken = await adminAuth.verifyIdToken(token)
      const userRole = decodedToken.role

      const isAuthorized =
        (requiredRole && userRole === requiredRole) ||
        (allowedRoles.length > 0 && allowedRoles.includes(userRole))

      if (!isAuthorized) {
        return NextResponse.json(
          { message: 'Forbidden: Insufficient permissions' },
          { status: 403 },
        )
      }

      return handler(req, context)
    } catch (error) {
      console.error('Token verification failed:', error)
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }
  }
}
