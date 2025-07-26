'use client'

import { useState, FormEvent } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import { auth } from '../../../lib/firebase/firebaseConfig'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getIdToken,
  AuthError,
} from 'firebase/auth'
import CenteredPageLayout from '../../../components/CenteredPageLayout'

export default function AuthPage() {
  const t = useTranslations('Auth')
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const getRedirectUrl = (): string => {
    const redirectTo = searchParams.get('redirect')

    // Validate the redirect URL to prevent open redirect attacks
    if (redirectTo) {
      // Only allow relative URLs (starting with /) or same-origin URLs
      try {
        const url = new URL(redirectTo, window.location.origin)
        if (url.origin === window.location.origin) {
          return redirectTo
        }
      } catch {
        // Invalid URL, fall through to default
      }
    }

    return '/' // Default to main page
  }

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setError(null)
    setSuccess(null)
  }

  const getErrorMessage = (error: AuthError): string => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return t('errors.emailInUse')
      case 'auth/weak-password':
        return t('errors.weakPassword')
      case 'auth/password-does-not-meet-requirements':
        return t('errors.passwordRequirements')
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return t('errors.invalidCredentials')
      case 'auth/too-many-requests':
        return t('errors.tooManyRequests')
      default:
        return error.message
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password)
        const token = await getIdToken(auth.currentUser!, true)

        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        })

        if (!response.ok) {
          throw new Error('Failed to authenticate with server')
        }

        setSuccess(t('loginSuccess'))
        router.push(getRedirectUrl())
      } else {
        await createUserWithEmailAndPassword(auth, email, password)
        const token = await getIdToken(auth.currentUser!, true)

        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        })

        if (!response.ok) {
          throw new Error('Failed to authenticate with server')
        }

        setSuccess(t('signupSuccess'))
        router.push(getRedirectUrl())
      }
    } catch (err) {
      if (err instanceof Error && 'code' in err) {
        setError(getErrorMessage(err as AuthError))
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <CenteredPageLayout>
      <h2
        className="font-bold mb-6 text-center"
        style={{
          fontSize: 'var(--font-size-lg)',
          color: 'var(--color-primary)',
        }}
      >
        {isLogin ? t('loginTitle') : t('signupTitle')}
      </h2>

      <form
        onSubmit={handleSubmit}
        autoComplete="on"
        className="flex flex-col space-y-5"
      >
        <input
          name="email"
          type="email"
          placeholder={t('emailPlaceholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2"
          style={{
            backgroundColor: '#f9fafb',
            color: 'var(--color-placeholder)',
            fontSize: 'var(--font-size-md)',
            borderColor: 'var(--color-muted)',
            fontFamily: 'var(--font-sans)',
          }}
        />
        <input
          name="password"
          type="password"
          placeholder={t('passwordPlaceholder')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete={isLogin ? 'current-password' : 'new-password'}
          className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2"
          style={{
            backgroundColor: '#f9fafb',
            color: 'var(--color-placeholder)',
            fontSize: 'var(--font-size-md)',
            borderColor: 'var(--color-muted)',
            fontFamily: 'var(--font-sans)',
          }}
        />
        <button
          type="submit"
          disabled={loading}
          className="py-3 rounded-md font-semibold disabled:opacity-50 transition-colors"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            fontSize: 'var(--font-size-md)',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              'var(--color-primary-hover)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = 'var(--color-primary)')
          }
        >
          {loading
            ? t('loadingText')
            : isLogin
              ? t('loginButton')
              : t('signupButton')}
        </button>

        {error && (
          <p
            className="text-center p-3 rounded-md"
            style={{
              color: 'var(--color-error)',
              backgroundColor: 'var(--color-error-bg, #fef2f2)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            {error}
          </p>
        )}

        {success && (
          <p
            className="text-center p-3 rounded-md"
            style={{
              color: 'var(--color-success)',
              backgroundColor: 'var(--color-success-bg, #f0fdf4)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            {success}
          </p>
        )}
      </form>

      <p
        className="mt-6 text-center"
        style={{
          color: 'var(--color-foreground)',
          fontSize: 'var(--font-size-sm)',
        }}
      >
        {isLogin ? t('noAccountText') : t('hasAccountText')}{' '}
        <button
          onClick={() => {
            setIsLogin(!isLogin)
            resetForm()
          }}
          className="hover:underline"
          style={{ color: 'var(--color-primary)' }}
        >
          {isLogin ? t('createAccountLink') : t('loginLink')}
        </button>
      </p>
    </CenteredPageLayout>
  )
}
