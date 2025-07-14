'use client'

import CenteredPageLayout from '../components/CenteredPageLayout'
import Link from 'next/link'

export default function NotFound() {
  return (
    <CenteredPageLayout>
      <h1
        className="font-extrabold mb-4"
        style={{
          color: 'var(--color-primary)',
          fontSize: 'var(--font-size-lg)',
          transition: 'color 0.5s ease',
        }}
      >
        Page Not Found
      </h1>
      <p
        className="mb-8"
        style={{
          color: 'var(--color-muted)',
          fontSize: 'var(--font-size-md)',
          transition: 'color 0.5s ease',
        }}
      >
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Link
        href="/"
        className="inline-block font-semibold px-6 py-3 rounded-md transition"
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          fontSize: 'var(--font-size-md)',
          transition: 'background-color 0.5s ease, color 0.5s ease',
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)')
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = 'var(--color-primary)')
        }
      >
        Go Home
      </Link>
    </CenteredPageLayout>
  )
}
