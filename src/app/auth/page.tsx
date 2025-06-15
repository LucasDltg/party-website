'use client'

import { useState, FormEvent } from 'react'
import { auth } from '../../lib/firebaseConfig'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { getIdToken } from 'firebase/auth'

import '../../styles/globals.css'

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

        // Get token and set cookie here
        const token = await getIdToken(auth.currentUser!, true)
        await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        })

        alert('Logged in successfully!')
      } else {
        await createUserWithEmailAndPassword(auth, email, password)

        // Also set cookie on signup
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
    <div className="min-h-screen bg-gradient-to-tr from-purple-600 to-indigo-600 flex justify-center items-center font-sans">
      <div className="bg-white p-8 rounded-xl shadow-lg w-80">
        <h2 className="text-2xl text-gray-800 font-bold mb-6 text-center">
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
            className="px-4 py-3 bg-gray-100 text-gray-900 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            className="px-4 py-3 bg-gray-100 text-gray-900 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
          {error && (
            <p className="text-red-600 text-sm text-center mt-2">{error}</p>
          )}
        </form>
        <p className="mt-6 text-center text-gray-600">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              resetForm()
            }}
            className="text-indigo-600 hover:underline focus:outline-none"
          >
            {isLogin ? 'Create one' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  )
}
