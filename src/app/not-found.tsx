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
        }}
      >
        Page Not Found
      </h1>
      <p
        className="mb-8"
        style={{
          color: 'var(--foregroung-color)',
          fontSize: 'var(--font-size-md)',
        }}
      >
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Link
        href="/"
        className="inline-block font-semibold px-6 py-3 rounded-md"
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          fontSize: 'var(--font-size-md)',
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
