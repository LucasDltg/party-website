'use client'
import { useState } from 'react'
import { useThemeWithCookie } from '@/hooks/useThemeWithCookie'
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi'

export function ThemeSwitcher() {
  const { setTheme, resolvedTheme, mounted } = useThemeWithCookie()
  const [isHovered, setIsHovered] = useState(false)

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  if (!mounted) {
    return (
      <button
        aria-hidden="true"
        style={{
          padding: 'var(--spacing-sm)',
          borderRadius: '50%',
          fontSize: 'var(--font-size-lg)',
          width: 'var(--button-size)',
          height: 'var(--button-size)',
          backgroundColor: 'transparent',
          border: 'none',
          visibility: 'hidden',
        }}
      >
        <HiOutlineSun />
      </button>
    )
  }

  const buttonStyle: React.CSSProperties = {
    padding: 'var(--spacing-sm)',
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
    width: 'var(--button-size)',
    height: 'var(--button-size)',
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
      {resolvedTheme === 'dark' ? (
        <HiOutlineSun size={24} />
      ) : (
        <HiOutlineMoon size={24} />
      )}
    </button>
  )
}
