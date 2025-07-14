'use client'

import '../styles/globals.css'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      className="h-[calc(100vh-var(--header-height))] overflow-hidden flex flex-col justify-center items-center font-sans px-4"
      style={{
        background:
          'linear-gradient(to top right, var(--color-primary), var(--color-secondary))',
        color: 'var(--foreground)',
      }}
    >
      <div
        className="rounded-xl shadow-lg p-10 max-w-md w-full text-center"
        style={{
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
        }}
      >
        <h1
          className="text-4xl font-extrabold mb-4"
          style={{ color: 'var(--color-primary)' }}
        >
          Page Not Found
        </h1>
        <p className="mb-8" style={{ color: 'var(--color-muted)' }}>
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link
          href="/"
          className="inline-block font-semibold px-6 py-3 rounded-md transition"
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
