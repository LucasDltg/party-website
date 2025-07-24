import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { routing } from '@/lib/i18n/routing'
import { getTranslations } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'

import '../../styles/globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// Generate static params for all supported locales
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),

    creator: 'Lucas Deletang',
    metadataBase: new URL('https://lucas.deletang.dev'),
    alternates: {
      canonical: `https://lucas.deletang.dev/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [
          loc,
          `https://lucas.deletang.dev/${loc}`,
        ]),
      ),
    },
    // Open Graph metadata with language support
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://lucas.deletang.dev/${locale}`,
      siteName: 'Lucas Deletang Portfolio',
      locale: locale,
      type: 'website',
    },
    // Additional SEO metadata
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    // Language alternates for better SEO
    other: {
      'Content-Language': locale,
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <head>{/* Remove the themeScript - next-themes handles this */}</head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black dark:bg-black dark:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          storageKey="theme"
          enableSystem={true}
          disableTransitionOnChange={false}
        >
          <NextIntlClientProvider>
            {/* Fixed Header */}
            <Header />

            {/* Main content wrapper with top padding using CSS var */}
            <main
              style={{ paddingTop: 'var(--header-height)', minHeight: '100vh' }}
            >
              {children}
            </main>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
