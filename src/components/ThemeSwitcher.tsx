'use client'

import { useEffect, useState } from 'react'

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // Initialize theme on mount
    const initializeTheme = () => {
      const saved = localStorage.getItem('theme')
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches

      let newTheme: 'light' | 'dark'

      if (saved === 'light' || saved === 'dark') {
        newTheme = saved
      } else if (prefersDark) {
        newTheme = 'dark'
      } else {
        newTheme = 'light'
      }

      setTheme(newTheme)
      document.documentElement.classList.toggle('dark', newTheme === 'dark')
      setMounted(true)
    }

    initializeTheme()
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Add smooth transition after component mounts
    const body = document.body
    body.style.transition = 'var(--transition)'

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if no theme is explicitly saved
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light'
        setTheme(newTheme)
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [mounted])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('theme', newTheme)
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
