'use client'
import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

export function useThemeWithCookie() {
  const [theme, setThemeState] = useState<Theme>('system')
  const [mounted, setMounted] = useState(false)

  // Get initial theme from cookie or localStorage
  useEffect(() => {
    const savedTheme =
      getCookie('theme') || localStorage.getItem('theme') || 'system'
    setThemeState(savedTheme as Theme)
    applyTheme(savedTheme as Theme)
    setMounted(true)
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    // Save to both cookie and localStorage
    setCookie('theme', newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  const resolvedTheme = getResolvedTheme(theme)

  return { theme, setTheme, resolvedTheme, mounted }
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

function setCookie(name: string, value: string) {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=${value}; path=/; max-age=31536000; SameSite=Lax`
}

function getResolvedTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }
    return 'light'
  }
  return theme
}

function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return

  const resolved = getResolvedTheme(theme)
  if (resolved === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
