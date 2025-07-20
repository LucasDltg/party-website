// src/config/i18n.ts
export const i18nConfig = {
  locales: ['en', 'fr'] as const,
  defaultLocale: 'en' as const,
  existingPages: ['auth', 'admin', 'cv', 'lang', 'unauthorized'] as const,
} as const

export type Locale = (typeof i18nConfig.locales)[number]
export type ExistingPage = (typeof i18nConfig.existingPages)[number]

// Helper functions
export function isValidLocale(locale: string): locale is Locale {
  return i18nConfig.locales.includes(locale as Locale)
}

export function isExistingPage(page: string): page is ExistingPage {
  return i18nConfig.existingPages.includes(page as ExistingPage)
}
