'use client'

import Link from 'next/link'
import CenteredPageLayout from '../../../components/CenteredPageLayout' // adjust path as needed

export default function Unauthorized() {
  return (
    <CenteredPageLayout>
      <h1
        className="font-extrabold mb-4"
        style={{
          color: 'var(--color-primary)',
          fontSize: 'var(--font-size-lg)',
        }}
      >
        Access Denied
      </h1>
      <p
        className="mb-8"
        style={{
          color: 'var(--foreground-color)',
          fontSize: 'var(--font-size-md)',
        }}
      >
        You do not have permission to view this page.
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
