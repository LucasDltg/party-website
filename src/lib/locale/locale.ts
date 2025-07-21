// src/lib/locale.ts
import 'server-only'
import { NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { i18nConfig, type Locale } from '@/config/i18n'

// Shared dictionary import
const getCommonDictionary = async () =>
  import('./common.json').then((module) => module.default)

// Dictionary imports
const dictionaries = {
  en: () => import('./locales/en.json').then((module) => module.default),
  fr: () => import('./locales/fr.json').then((module) => module.default),
}

// Get dictionary for locale
export const getDictionary = async (locale: Locale) => {
  const [common, localeDict] = await Promise.all([
    getCommonDictionary(),
    dictionaries[locale](),
  ])

  return {
    common,
    ...localeDict,
  }
}

// Detect user-preferred locale from request headers
export function getLocale(request: NextRequest): Locale {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value
  })

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  return match(
    languages,
    [...i18nConfig.locales],
    i18nConfig.defaultLocale,
  ) as Locale
}

// Get locale from pathname
export function getLocaleFromPathname(pathname: string): Locale | null {
  const segments = pathname.split('/')
  const firstSegment = segments[1]

  if (firstSegment && i18nConfig.locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale
  }

  return null
}

// Remove locale from pathname
export function removeLocaleFromPathname(pathname: string): string {
  const segments = pathname.split('/')
  const firstSegment = segments[1]

  if (firstSegment && i18nConfig.locales.includes(firstSegment as Locale)) {
    return '/' + segments.slice(2).join('/')
  }

  return pathname
}
