'use client'

import '../styles/globals.css'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      className="h-[calc(100vh-var(--header-height))] flex flex-col justify-center items-center font-sans px-6"
      style={{
        background: `linear-gradient(
          135deg,
          var(--color-primary) 0%,
          var(--color-secondary) 100%
        )`,
        color: 'var(--foreground)',
      }}
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-12 max-w-md w-full text-center border border-primary dark:border-secondary">
        <h1
          className="text-5xl font-extrabold mb-6"
          style={{ color: 'var(--color-primary)' }}
        >
          Page Not Found
        </h1>
        <p className="mb-10 text-lg" style={{ color: 'var(--color-muted)' }}>
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link
          href="/"
          className="inline-block font-semibold px-8 py-3 rounded-lg transition-shadow shadow-md hover:shadow-lg"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'white',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              'var(--color-primary-hover)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = 'var(--color-primary)')
          }
        >
          Go Home
        </Link>
      </div>
    </main>
  )
}
