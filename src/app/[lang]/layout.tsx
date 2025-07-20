import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import { getDictionary } from '@/lib/locale/locale'

import '../../styles/globals.css'
import { i18nConfig, isValidLocale, Locale } from '@/config/i18n'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// Generate static params for all supported locales
export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({
    lang: locale,
  }))
}

// Generate metadata based on language
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>
}): Promise<Metadata> {
  const p = await params
  const dict = await getDictionary(p.lang)

  const metadata = dict.metadata

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    creator: 'Lucas Deletang',
    metadataBase: new URL('https://lucas.deletang.dev'),
    alternates: {
      canonical: `https://lucas.deletang.dev/${p.lang}`,
      languages: {
        en: 'https://lucas.deletang.dev/en',
        fr: 'https://lucas.deletang.dev/fr',
      },
    },
    // Open Graph metadata with language support
    openGraph: {
      title: metadata.title.default || metadata.title,
      description: metadata.description,
      url: `https://lucas.deletang.dev/${p.lang}`,
      siteName: 'Lucas Deletang Portfolio',
      locale: p.lang,
      type: 'website',
    },
  }
}

const themeScript = `
  (function() {
    function getInitialTheme() {
      const persistedTheme = localStorage.getItem('theme');
      const hasPersistedTheme = typeof persistedTheme === 'string';
      
      if (hasPersistedTheme) {
        return persistedTheme;
      }
      
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      const hasMediaQueryPreference = typeof mql.matches === 'boolean';
      
      if (hasMediaQueryPreference) {
        return mql.matches ? 'dark' : 'light';
      }
      
      return 'light';
    }
    
    const theme = getInitialTheme();
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  })();
`
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}>) {
  const aparams = await params
  // Validate the language parameter
  if (!isValidLocale(aparams.lang)) {
    notFound()
  }

  return (
    <html lang={aparams.lang} suppressHydrationWarning={true}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black dark:bg-black dark:text-white`}
      >
        {/* Fixed Header */}
        <Header />

        {/* Main content wrapper with top padding using CSS var */}
        <main
          style={{ paddingTop: 'var(--header-height)', minHeight: '100vh' }}
        >
          {children}
        </main>
      </body>
    </html>
  )
}
