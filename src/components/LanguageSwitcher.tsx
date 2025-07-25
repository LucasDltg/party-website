'use client'

import { useState, useEffect } from 'react'
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

  useEffect(() => {
    if (!isOpen) return // only listen when open

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur()
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  const dropdownButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    padding: 'var(--spacing-xs) var(--spacing-sm)',
    borderRadius: 'var(--radius-md)',
    fontWeight: 600,
    cursor: 'pointer',
    backgroundColor: 'transparent',
    color: isHovered ? 'var(--color-primary-hover)' : 'var(--color-primary)',
    border: 'none',
    transition: 'var(--transition)',
    fontSize: 'var(--font-size-md)',
    fontFamily: 'var(--font-sans)',
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
          // style={{ borderRadius: 'var(--spacing-xs)' }}
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
            transition: 'var(--transition-transform)',
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
            marginTop: 'var(--spacing-sm)',
            backgroundColor: 'var(--background)',
            border: `1px solid var(--color-muted)`,
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            zIndex: 50,
            minWidth: '160px',
          }}
        >
          <ul
            style={{
              padding: 'var(--spacing-xs) 0',
              margin: 0,
              listStyle: 'none',
            }}
          >
            {locales.map((lang) => (
              <li key={lang} style={{ margin: 0 }}>
                <button
                  onClick={() => handleLanguageSelect(lang)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)',
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    fontSize: 'var(--font-size-sm)',
                    fontFamily: 'var(--font-sans)',
                    color:
                      locale === lang
                        ? 'var(--color-primary)'
                        : 'var(--foreground)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    textAlign: 'left',
                    opacity: locale === lang ? 0.8 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (locale !== lang) {
                      e.currentTarget.style.backgroundColor =
                        'rgba(75, 85, 99, 0.1)'
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
