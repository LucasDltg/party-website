'use client'

import { useState, FormEvent } from 'react'
import { useTranslations } from 'next-intl'
import { auth } from '../../../lib/firebase/firebaseConfig'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getIdToken,
} from 'firebase/auth'
import CenteredPageLayout from '../../../components/CenteredPageLayout'

export default function AuthPage() {
  const t = useTranslations('Auth')
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setError(null)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password)
        const token = await getIdToken(auth.currentUser!, true)
        await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        })
        alert(t('loginSuccess'))
      } else {
        await createUserWithEmailAndPassword(auth, email, password)
        const token = await getIdToken(auth.currentUser!, true)
        await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        })
        alert(t('signupSuccess'))
      }
      resetForm()
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
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
            color: '#0a0a0a',
            fontSize: 'var(--font-size-md)',
            borderColor: '#cbd5e1',
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
            color: '#0a0a0a',
            fontSize: 'var(--font-size-md)',
            borderColor: '#cbd5e1',
            fontFamily: 'var(--font-sans)',
          }}
        />
        <button
          type="submit"
          disabled={loading}
          className="py-3 rounded-md font-semibold disabled:opacity-50"
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
            className="text-center"
            style={{
              color: 'var(--color-error)',
              fontSize: 'var(--font-size-sm)',
            }}
          >
            {error}
          </p>
        )}
      </form>

      <p
        className="mt-6 text-center"
        style={{ color: 'var(--color-muted)', fontSize: 'var(--font-size-sm)' }}
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
