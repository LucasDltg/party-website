// src/hooks/useLocale.ts
'use client'

import { useParams } from 'next/navigation'
import { i18nConfig, type Locale } from '@/config/i18n'

export function useLocale(): Locale {
  const params = useParams()
  const lang = params?.lang as string

  // Validate and return the locale, fallback to default
  if (lang && i18nConfig.locales.includes(lang as Locale)) {
    return lang as Locale
  }

  return i18nConfig.defaultLocale
}
