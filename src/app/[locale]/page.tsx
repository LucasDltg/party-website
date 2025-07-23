'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('Home')

  return (
    <div
      className="flex flex-col"
      style={{
        paddingTop: 'var(--header-height)',
        minHeight: 'calc(100vh - var(--header-height))',
      }}
    >
      <main
        className="flex-grow px-6 sm:px-8 lg:px-12 pb-16 font-sans"
        style={{
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
          transition: 'var(--transition)',
        }}
      >
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto pt-16 pb-24">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight pb-4"
                style={{
                  background:
                    'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  transition: 'var(--transition-transform)',
                }}
              >
                {t('hero.name')}
              </h1>
              <div
                className="w-24 h-1 mx-auto rounded-full"
                style={{
                  background:
                    'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                  transition: 'var(--transition-transform)',
                }}
              ></div>
            </div>

            <p
              className="text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed"
              style={{
                color: 'var(--muted-foreground)',
                transition: 'var(--transition)',
              }}
            >
              {t('hero.tagline')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link
                href="/cv"
                className="px-8 py-4 text-lg font-semibold rounded-full border-2 hover:scale-105"
                style={{
                  borderColor: 'var(--color-primary)',
                  color: 'var(--color-primary)',
                  backgroundColor: 'transparent',
                  transition: 'var(--transition-scale)',
                }}
              >
                {t('hero.viewCvButton')}
              </Link>

              <Link
                href="/contact"
                className="px-8 py-4 text-lg font-semibold rounded-full border-2 hover:scale-105"
                style={{
                  borderColor: 'var(--color-primary)',
                  color: 'var(--color-primary)',
                  backgroundColor: 'transparent',
                  transition: 'var(--transition-scale)',
                }}
              >
                {t('hero.contactButton')}
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ transition: 'var(--transition)' }}
            >
              {t('features.title')}
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{
                color: 'var(--muted-foreground)',
                transition: 'var(--transition)',
              }}
            >
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="group p-8 rounded-2xl hover:scale-105"
              style={{
                backgroundColor:
                  'var(--card-background, rgba(255, 255, 255, 0.05))',
                border: '1px solid var(--border, rgba(255, 255, 255, 0.1))',
                transition: 'var(--transition-scale)',
              }}
            >
              <div className="space-y-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--button-foreground)',
                    transition: 'var(--transition)',
                  }}
                >
                  🔐
                </div>
                <h3
                  className="text-xl font-semibold"
                  style={{ transition: 'var(--transition)' }}
                >
                  {t('features.authentication.title')}
                </h3>
                <p
                  style={{
                    color: 'var(--muted-foreground)',
                    transition: 'var(--transition)',
                  }}
                >
                  {t('features.authentication.description')}
                </p>
              </div>
            </div>

            <div
              className="group p-8 rounded-2xl hover:scale-105"
              style={{
                backgroundColor:
                  'var(--card-background, rgba(255, 255, 255, 0.05))',
                border: '1px solid var(--border, rgba(255, 255, 255, 0.1))',
                transition: 'var(--transition-scale)',
              }}
            >
              <div className="space-y-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--button-foreground)',
                    transition: 'var(--transition)',
                  }}
                >
                  🌍
                </div>
                <h3
                  className="text-xl font-semibold"
                  style={{ transition: 'var(--transition)' }}
                >
                  {t('features.internationalization.title')}
                </h3>
                <p
                  style={{
                    color: 'var(--muted-foreground)',
                    transition: 'var(--transition)',
                  }}
                >
                  {t('features.internationalization.description')}
                </p>
              </div>
            </div>

            <div
              className="group p-8 rounded-2xl hover:scale-105"
              style={{
                backgroundColor:
                  'var(--card-background, rgba(255, 255, 255, 0.05))',
                border: '1px solid var(--border, rgba(255, 255, 255, 0.1))',
                transition: 'var(--transition-scale)',
              }}
            >
              <div className="space-y-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--button-foreground)',
                    transition: 'var(--transition)',
                  }}
                >
                  📄
                </div>
                <h3
                  className="text-xl font-semibold"
                  style={{ transition: 'var(--transition)' }}
                >
                  {t('features.interactiveCv.title')}
                </h3>
                <p
                  style={{
                    color: 'var(--muted-foreground)',
                    transition: 'var(--transition)',
                  }}
                >
                  {t('features.interactiveCv.description')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer
        className="flex justify-center text-sm pb-6 px-6"
        style={{
          color: 'var(--muted-foreground)',
          transition: 'var(--transition)',
        }}
      >
        <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
      </footer>
    </div>
  )
}
