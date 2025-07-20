import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import Header from '../../components/Header'

import '../../styles/globals.css'
import { i18nConfig, isValidLocale } from '@/config/i18n'

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

export const metadata: Metadata = {
  title: {
    default: 'Lucas Deletang Portfolio',
    template: '%s | Lucas Deletang',
  },
  description: 'Personal portfolio of Lucas Deletang',
  keywords: [
    'Lucas Deletang',
    'Frontend Developer',
    'Next.js',
    'Tailwind CSS',
    'Firebase',
    'Web Development',
    'Dark Mode',
    'React',
    'Portfolio',
  ],
  creator: 'Lucas Deletang',
  metadataBase: new URL('https://lucas.deletang.dev'),
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
  params: Promise<{ lang: 'en' | 'fr' }>
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
