// components/AuthGuard.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useAuth, UserRole } from '../hooks/useAuth'
import { ReactNode, useEffect } from 'react'

interface AuthGuardProps {
  children: ReactNode
  requiredRole?: UserRole
  allowedRoles?: UserRole[]
  requireAuth?: boolean
  redirectTo?: string
  fallback?: ReactNode
}

export default function AuthGuard({
  children,
  requiredRole,
  allowedRoles = [],
  requireAuth = true,
  redirectTo,
  fallback,
}: AuthGuardProps) {
  const { authState, role, hasRole, hasAnyRole } = useAuth()
  const router = useRouter()
  const t = useTranslations('AuthGuard')

  useEffect(() => {
    if (authState === 'loading') return

    // Check if authentication is required
    if (requireAuth && authState === 'unauthenticated') {
      const currentPath = encodeURIComponent(window.location.pathname)
      const redirectPath = redirectTo || `/auth?redirect=${currentPath}`
      router.push(redirectPath)
      return
    }

    // Check role permissions
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
  ])

  // Show loading state for all non-authorized states
  if (
    authState === 'loading' ||
    (requireAuth && authState === 'unauthenticated') ||
    (authState === 'authenticated' && requiredRole && !hasRole(requiredRole)) ||
    (authState === 'authenticated' &&
      allowedRoles.length > 0 &&
      !hasAnyRole(allowedRoles))
  ) {
    return (
      fallback || (
        <main className="h-[calc(100vh-var(--header-height))] flex justify-center items-center font-sans">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>{t('loading')}</p>
          </div>
        </main>
      )
    )
  }

  return <>{children}</>
}

// // pages/SomeOtherPage.tsx - Conditionally show content based on role
// 'use client'

// import { useAuth } from '../hooks/useAuth'
// import { useTranslations } from 'next-intl'

// export default function SomeOtherPage() {
//   const { isAuthenticated, hasRole, hasAnyRole, role, isLoading } = useAuth()
//   const t = useTranslations('General')

//   if (isLoading) {
//     return <div>Loading...</div>
//   }

//   return (
//     <main className="p-8">
//       <h1>Some Page</h1>

//       {/* Show image only for admin users */}
//       {hasRole('admin') && (
//         <img src="/admin-only-image.jpg" alt="Admin content" />
//       )}

//       {/* Show content for admin or moderator */}
//       {hasAnyRole(['admin', 'moderator']) && (
//         <div className="bg-yellow-100 p-4 rounded">
//           <p>This content is visible to admins and moderators only</p>
//         </div>
//       )}

//       {/* Show different content based on specific role */}
//       {role === 'admin' && <p>You are an admin</p>}
//       {role === 'moderator' && <p>You are a moderator</p>}
//       {role === 'user' && <p>You are a regular user</p>}

//       {/* Show content only for authenticated users */}
//       {isAuthenticated ? (
//         <p>Welcome back, authenticated user!</p>
//       ) : (
//         <p>Please log in to see more content</p>
//       )}

//       {/* Public content - always visible */}
//       <div>
//         <p>This content is visible to everyone</p>
//       </div>
//     </main>
//   )
// }

// // pages/ModeratorPage.tsx - Multiple allowed roles
// export default function ModeratorPage() {
//   return (
//     <AuthGuard allowedRoles={['admin', 'moderator']}>
//       <div>
//         <h1>Moderator Dashboard</h1>
//         <p>This page is accessible to both admins and moderators</p>
//       </div>
//     </AuthGuard>
//   )
// }

// // pages/ProfilePage.tsx - Just requires authentication, any role
// export default function ProfilePage() {
//   return (
//     <AuthGuard requireAuth={true}>
//       <div>
//         <h1>Your Profile</h1>
//         <p>Any authenticated user can access this page</p>
//       </div>
//     </AuthGuard>
//   )
// }

// // pages/PublicPage.tsx - No authentication required, but conditional content
// export default function PublicPage() {
//   const { isAuthenticated, hasRole } = useAuth()

//   return (
//     <div>
//       <h1>Public Page</h1>
//       <p>This page is accessible to everyone</p>

//       {isAuthenticated && <p>Extra content for logged-in users</p>}
//       {hasRole('admin') && <p>Special admin notice</p>}
//     </div>
//   )
// }
