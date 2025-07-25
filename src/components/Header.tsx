'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { auth } from '../lib/firebase/firebaseConfig'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeSwitcher } from './ThemeSwitcher'

export default function Header() {
  const t = useTranslations('Header')
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
    setMounted(true)
  }, [])

  const baseButtonStyle: React.CSSProperties = {
    padding: 'var(--spacing-xs) var(--spacing-sm)',
    borderRadius: 'var(--radius-md)',
    fontWeight: 600,
    cursor: 'pointer',
    backgroundColor: 'transparent',
    color: 'var(--color-primary)',
    border: 'none',
    transition: 'var(--transition)',
    fontSize: 'var(--font-size-md)',
    fontFamily: 'var(--font-sans)',
  }

  const hoveredStyle: React.CSSProperties = {
    color: 'var(--color-primary-hover)',
  }

  const logoSize = 32 // Could be made into a CSS variable if needed

  // Render navigation content based on mounted state
  const renderNavigation = () => {
    return (
      <>
        {mounted && user ? (
          <>
            <span
              style={{
                color: 'var(--color-muted)',
                fontSize: 'var(--font-size-sm)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              {t('greeting', { email: user.email ?? '' })}
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
              {t('logout')}
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
              {t('connect')}
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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 'var(--header-height)',
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
        transition: 'var(--transition)',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
          padding: `var(--spacing-md) var(--spacing-lg)`,
        }}
      >
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-sm)',
            textDecoration: 'none',
          }}
        >
          <Image
            src="/logo.png"
            alt={t('logoAlt')}
            width={logoSize}
            height={logoSize}
          />
        </Link>

        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-md)',
          }}
        >
          {renderNavigation()}
        </nav>
      </div>

      {/* Primary/Secondary gradient bar */}
      <div
        style={{
          height: '4px',
          background:
            'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
          transition: 'var(--transition-transform)',
        }}
      />

      {/* Bottom separator */}
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
