'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { auth } from '../lib/firebaseConfig'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'

export default function Header() {
  const [user, setUser] = useState<User | null>(null)
  const [hoveredButton, setHoveredButton] = useState<
    'connect' | 'logout' | 'theme' | null
  >(null)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    await signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved)
      document.documentElement.classList.toggle('dark', saved === 'dark')
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
      document.documentElement.classList.add('dark')
    } else {
      setTheme('light')
      document.documentElement.classList.remove('dark')
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    const body = document.body
    body.style.transition = 'background-color 0.5s ease, color 0.5s ease'
  }, [mounted])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setTheme('dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setTheme('light')
    }
  }

  const baseButtonStyle: React.CSSProperties = {
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    fontWeight: 600,
    cursor: 'pointer',
    backgroundColor: 'transparent',
    color: 'var(--color-primary)',
    border: 'none',
    transition: 'color 0.3s ease',
    fontSize: 'var(--font-size-md)',
  }

  const hoveredStyle: React.CSSProperties = {
    color: 'var(--color-primary-hover)',
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        height: 'var(--header-height)',
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        transition: 'background-color 0.5s ease, color 0.5s ease',
      }}
    >
      <div className="flex justify-between items-center h-full px-5 py-3">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
        </Link>

        <nav className="flex items-center space-x-4">
          {user ? (
            <>
              <span
                className="text-sm"
                style={{
                  color: 'var(--foreground)',
                  fontSize: 'var(--font-size-sm)',
                }}
              >
                Hello, {user.email}
              </span>
              <button
                onClick={handleLogout}
                style={
                  hoveredButton === 'logout'
                    ? { ...baseButtonStyle, ...hoveredStyle }
                    : baseButtonStyle
                }
                onMouseEnter={() => setHoveredButton('logout')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/auth">
              <button
                style={
                  hoveredButton === 'connect'
                    ? { ...baseButtonStyle, ...hoveredStyle }
                    : baseButtonStyle
                }
                onMouseEnter={() => setHoveredButton('connect')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Connect
              </button>
            </Link>
          )}

          {/* Theme toggle button */}
          <button
            onClick={toggleTheme}
            style={{
              ...baseButtonStyle,
              padding: '0.5rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--font-size-lg)',
              color:
                hoveredButton === 'theme'
                  ? 'var(--color-primary-hover)'
                  : 'var(--color-primary)',
              backgroundColor: 'transparent',
              border: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={() => setHoveredButton('theme')}
            onMouseLeave={() => setHoveredButton(null)}
            aria-label="Toggle light/dark mode"
            title="Toggle light/dark mode"
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
        </nav>
      </div>

      <div
        style={{
          height: '4px',
          background:
            'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
          transition: 'background 0.5s ease',
        }}
      />

      <div
        style={{
          height: '2px',
          backgroundColor: 'var(--background)',
          transition: 'background-color 0.5s ease, color 0.5s ease',
        }}
      />
    </header>
  )
}
