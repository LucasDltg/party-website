// hooks/useAuth.ts
'use client'

import { useEffect, useState } from 'react'
import { auth } from '@/lib/firebase/firebaseConfig'
import { User } from 'firebase/auth'

export type AuthState = 'loading' | 'unauthenticated' | 'authenticated'
export type UserRole = 'admin' | 'user' | 'moderator' | null

export interface AuthData {
  user: User | null
  role: UserRole
  authState: AuthState
  isLoading: boolean
  isAuthenticated: boolean
  hasRole: (requiredRole: UserRole) => boolean
  hasAnyRole: (roles: UserRole[]) => boolean
}

export function useAuth(): AuthData {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<UserRole>(null)
  const [authState, setAuthState] = useState<AuthState>('loading')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      try {
        if (!currentUser) {
          setUser(null)
          setRole(null)
          setAuthState('unauthenticated')
          return
        }

        setUser(currentUser)

        // Get user's custom claims (role)
        const tokenResult = await currentUser.getIdTokenResult()
        const userRole = (tokenResult.claims.role as UserRole) || 'user'

        setRole(userRole)
        setAuthState('authenticated')
      } catch (error) {
        console.error('Error getting user role:', error)
        setUser(currentUser)
        setRole('user') // Default to 'user' role on error
        setAuthState('authenticated')
      }
    })

    return () => unsubscribe()
  }, [])

  const hasRole = (requiredRole: UserRole): boolean => {
    if (!requiredRole) return true // No role requirement
    return role === requiredRole
  }

  const hasAnyRole = (roles: UserRole[]): boolean => {
    if (!roles.length) return true // No role requirement
    return roles.includes(role)
  }

  return {
    user,
    role,
    authState,
    isLoading: authState === 'loading',
    isAuthenticated: authState === 'authenticated',
    hasRole,
    hasAnyRole,
  }
}
