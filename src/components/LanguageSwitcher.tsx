'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'

type Locale = 'en' | 'fr'

export function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const locales: Locale[] = ['en', 'fr']

  const languageNames: Record<Locale, string> = {
    en: 'English',
    fr: 'Français',
  }

  const handleLanguageSelect = (newLocale: Locale) => {
    // Remove the current locale from the pathname
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    // Navigate to the new locale path
    router.push(`/${newLocale}${pathnameWithoutLocale}`)
    setIsOpen(false)
  }

  const dropdownButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    fontWeight: 600,
    cursor: 'pointer',
    backgroundColor: 'transparent',
    color: isHovered ? 'var(--color-primary-hover)' : 'var(--color-primary)',
    border: 'none',
    transition: 'var(--transition)',
    fontSize: 'var(--font-size-md)',
    position: 'relative',
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={dropdownButtonStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Image
          src={`/${locale}.svg`}
          alt={`${languageNames[locale]} flag`}
          width={16}
          height={12}
          style={{ borderRadius: '0.125rem' }}
        />
        <span>{languageNames[locale]}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'var(--transition)',
          }}
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            left: '0',
            top: '100%',
            marginTop: '0.5rem',
            backgroundColor: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '0.375rem',
            boxShadow:
              '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            zIndex: 50,
            minWidth: '160px',
          }}
        >
          <ul style={{ padding: '0.25rem 0', margin: 0, listStyle: 'none' }}>
            {locales.map((lang) => (
              <li key={lang} style={{ margin: 0 }}>
                <button
                  onClick={() => handleLanguageSelect(lang)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.5rem 1rem',
                    fontSize: 'var(--font-size-sm)',
                    backgroundColor:
                      locale === lang ? 'var(--muted)' : 'transparent',
                    color:
                      locale === lang
                        ? 'var(--color-primary)'
                        : 'var(--foreground)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => {
                    if (locale !== lang) {
                      e.currentTarget.style.backgroundColor = 'var(--muted)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (locale !== lang) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }
                  }}
                >
                  <Image
                    src={`/${lang}.svg`}
                    alt={`${languageNames[lang]} flag`}
                    width={16}
                    height={12}
                    style={{ borderRadius: '0.125rem' }}
                  />
                  <span>{languageNames[lang]}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: '0',
            zIndex: 40,
            display: 'block',
          }}
          onClick={() => setIsOpen(false)}
          className="md:hidden"
        />
      )}
    </div>
  )
}
