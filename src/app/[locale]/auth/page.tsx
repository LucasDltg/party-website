'use client'

import { useState, FormEvent } from 'react'
import { auth } from '../../../lib/firebase/firebaseConfig'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getIdToken,
} from 'firebase/auth'
import CenteredPageLayout from '../../../components/CenteredPageLayout'

export default function AuthPage() {
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
        alert('Logged in successfully!')
      } else {
        await createUserWithEmailAndPassword(auth, email, password)
        const token = await getIdToken(auth.currentUser!, true)
        await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        })
        alert('Account created successfully!')
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
        {isLogin ? 'Login' : 'Create Account'}
      </h2>

      <form
        onSubmit={handleSubmit}
        autoComplete="on"
        className="flex flex-col space-y-5"
      >
        <input
          name="email"
          type="email"
          placeholder="Email"
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
          placeholder="Password"
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
          {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
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
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button
          onClick={() => {
            setIsLogin(!isLogin)
            resetForm()
          }}
          className="hover:underline"
          style={{ color: 'var(--color-primary)' }}
        >
          {isLogin ? 'Create one' : 'Login'}
        </button>
      </p>
    </CenteredPageLayout>
  )
}
