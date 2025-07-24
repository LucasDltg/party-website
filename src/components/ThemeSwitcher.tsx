'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div
        style={{
          padding: '0.5rem',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
        }}
      />
    )
  }

  const buttonStyle: React.CSSProperties = {
    padding: '0.5rem',
    borderRadius: '50%',
    fontWeight: 600,
    cursor: 'pointer',
    backgroundColor: 'transparent',
    color: isHovered ? 'var(--color-primary-hover)' : 'var(--color-primary)',
    border: 'none',
    transition: 'var(--transition)',
    fontSize: 'var(--font-size-lg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  return (
    <button
      onClick={toggleTheme}
      style={buttonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Toggle light/dark mode"
      title="Toggle light/dark mode"
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  )
}
