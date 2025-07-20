// src/hooks/useI18n.ts
'use client'

import { useLocale } from './useLocale'
import { i18nConfig, type Locale } from '@/config/i18n'

export function useI18n() {
  const currentLocale = useLocale()

  const switchLocale = (newLocale: Locale) => {
    const currentPath = window.location.pathname
    const segments = currentPath.split('/')

    // Replace the first segment (current locale) with new locale
    if (i18nConfig.locales.includes(segments[1] as Locale)) {
      segments[1] = newLocale
    } else {
      // If no locale in URL, prepend new locale
      segments.splice(1, 0, newLocale)
    }

    const newPath = segments.join('/')
    window.location.href = newPath
  }

  return {
    locale: currentLocale,
    locales: i18nConfig.locales,
    defaultLocale: i18nConfig.defaultLocale,
    switchLocale,
  }
}
