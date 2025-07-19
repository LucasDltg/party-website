import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Header from '../../components/Header'
import '../../styles/globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// 👇 Locales you want to statically generate
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }]
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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: 'en' | 'fr' }>
}>) {
  return (
    <html lang={(await params).lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
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
