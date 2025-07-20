'use client'
import { useI18n } from '@/hooks/useI18n'

export function LanguageSwitcher() {
  const { locale, locales, switchLocale } = useI18n()

  return (
    <div>
      {locales.map((lang) => (
        <button
          key={lang}
          onClick={() => switchLocale(lang)}
          className={locale === lang ? 'active' : ''}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
