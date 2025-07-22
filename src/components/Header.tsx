'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { auth } from '../lib/firebase/firebaseConfig'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeSwitcher } from './ThemeSwitcher'

export default function Header() {
  const [user, setUser] = useState<User | null>(null)
  const [hoveredButton, setHoveredButton] = useState<
    'connect' | 'logout' | null
  >(null)
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
    // Use a slight delay to ensure CSS variables are loaded
    const timer = setTimeout(() => {
      setMounted(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [])

  const baseButtonStyle: React.CSSProperties = {
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    fontWeight: 600,
    cursor: 'pointer',
    backgroundColor: 'transparent',
    color: 'var(--color-primary)',
    border: 'none',
    transition: 'var(--transition)',
    fontSize: 'var(--font-size-md)',
  }

  const hoveredStyle: React.CSSProperties = {
    color: 'var(--color-primary-hover)',
  }

  // Render navigation content based on mounted state
  const renderNavigation = () => {
    return (
      <>
        {mounted && user ? (
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
        ) : mounted && !user ? (
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
        ) : (
          // Placeholder space to prevent layout shift
          <div style={{ width: '80px' }} />
        )}

        <LanguageSwitcher />

        <ThemeSwitcher />
      </>
    )
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        height: 'var(--header-height)',
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
        transition: 'var(--transition)',
      }}
    >
      <div className="flex justify-between items-center h-full px-5 py-3">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
        </Link>

        <nav className="flex items-center space-x-4">{renderNavigation()}</nav>
      </div>

      <div
        style={{
          height: '4px',
          background:
            'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
        }}
      />

      <div
        style={{
          height: '2px',
          backgroundColor: 'var(--background)',
          transition: 'var(--transition)',
        }}
      />
    </header>
  )
}
