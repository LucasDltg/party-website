'use client'
import { useState } from 'react'
import { useThemeWithCookie } from '@/hooks/useThemeWithCookie'

export function ThemeSwitcher() {
  const { setTheme, resolvedTheme, mounted } = useThemeWithCookie()
  const [isHovered, setIsHovered] = useState(false)

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

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
      {resolvedTheme === 'dark' ? '🌞' : '🌙'}
    </button>
  )
}
