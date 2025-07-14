'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { auth } from '../lib/firebaseConfig'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'

export default function Header() {
  const [user, setUser] = useState<User | null>(null)
  const [hoveredButton, setHoveredButton] = useState<
    'connect' | 'logout' | null
  >(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return unsubscribe
  }, [])

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    await signOut(auth)
  }

  const baseButtonStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem', // 6px
    fontWeight: 500,
    cursor: 'pointer',
    border: `1px solid var(--color-primary)`,
    backgroundColor: 'var(--background)',
    color: 'var(--color-primary)',
    transition: 'background-color 0.2s ease, color 0.2s ease',
  }

  const hoveredStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-primary-hover)',
    color: 'white',
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        height: 'var(--header-height)',
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="flex justify-between items-center h-full px-5 py-3">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
        </Link>

        <nav>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm">Hello, {user.email}</span>
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
            </div>
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
        </nav>
      </div>

      <div
        style={{
          height: '4px',
          background:
            'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
        }}
      />
    </header>
  )
}
