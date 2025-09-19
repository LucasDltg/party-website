'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useAuth } from '@/hooks/useAuth'
import { UserRole } from '@/types/UserRole'
import { ReactNode, useEffect } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'
import MainLayout from './MainLayout'

interface AuthGuardProps {
  children: ReactNode
  requiredRole?: UserRole
  allowedRoles?: UserRole[]
  requireAuth?: boolean
  redirectTo?: string
  guestView?: ReactNode
  loadingView?: ReactNode
}

export default function AuthGuard({
  children,
  requiredRole,
  allowedRoles = [],
  requireAuth = true,
  redirectTo,
  guestView = null,
  loadingView = null,
}: AuthGuardProps) {
  const { authState, role, hasRole, hasAnyRole } = useAuth()
  const router = useRouter()
  const t = useTranslations('AuthGuard')

  useEffect(() => {
    if (authState === 'loading') return

    // Guest-only pages
    if (!requireAuth && authState === 'authenticated') {
      router.replace(redirectTo || '/')
      return
    }

    // Require auth
    if (requireAuth && authState === 'unauthenticated' && !guestView) {
      const currentPath = encodeURIComponent(window.location.pathname)
      router.push(redirectTo || `/auth?redirect=${currentPath}`)
      return
    }

    // Role-based access
    if (authState === 'authenticated') {
      const hasRequiredRole = requiredRole ? hasRole(requiredRole) : true
      const hasAllowedRole =
        allowedRoles.length > 0 ? hasAnyRole(allowedRoles) : true

      if (!hasRequiredRole || !hasAllowedRole) {
        router.push('/unauthorized')
        return
      }
    }
  }, [
    authState,
    role,
    requiredRole,
    allowedRoles,
    requireAuth,
    redirectTo,
    router,
    hasRole,
    hasAnyRole,
    guestView,
  ])

  // Loading / unauthorized / guest-view states
  if (authState === 'loading') {
    return loadingView ? (
      <>{loadingView}</>
    ) : (
      <MainLayout
        className="flex justify-center items-center"
        style={{ background: 'var(--background)' }}
      >
        <LoadingSpinner text={t('loading')} containerClassName="text-center" />
      </MainLayout>
    )
  }

  if (requireAuth && authState === 'unauthenticated') {
    return guestView ? <>{guestView}</> : null
  }

  if (authState === 'authenticated') {
    if (
      (requiredRole && !hasRole(requiredRole)) ||
      (allowedRoles.length > 0 && !hasAnyRole(allowedRoles))
    ) {
      return (
        <main className="h-[calc(100vh-var(--header-height))] flex justify-center items-center font-sans">
          <LoadingSpinner
            text={t('loading')}
            containerClassName="text-center"
          />
        </main>
      )
    }
  }

  return <>{children}</>
}
