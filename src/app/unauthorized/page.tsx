'use client'

import '../../styles/globals.css'
import Link from 'next/link'

export default function Unauthorized() {
  return (
    <main
      className="h-[calc(100vh-var(--header-height))] overflow-hidden flex flex-col justify-center items-center font-sans px-4"
      style={{
        background:
          'linear-gradient(to bottom right, var(--color-primary), var(--color-secondary))',
        color: 'var(--foreground)',
        transition: 'background 0.5s ease, color 0.5s ease',
      }}
    >
      <div
        className="rounded-xl shadow-lg p-10 max-w-md w-full text-center"
        style={{
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
          transition:
            'background-color 0.5s ease, color 0.5s ease, box-shadow 0.5s ease',
        }}
      >
        <h1
          className="font-extrabold mb-4"
          style={{
            color: 'var(--color-primary)',
            fontSize: 'var(--font-size-lg)',
            transition: 'color 0.5s ease',
          }}
        >
          Access Denied
        </h1>
        <p
          className="mb-8"
          style={{
            color: 'var(--color-muted)',
            fontSize: 'var(--font-size-md)',
            transition: 'color 0.5s ease',
          }}
        >
          You do not have permission to view this page.
        </p>
        <Link
          href="/"
          className="inline-block font-semibold px-6 py-3 rounded-md transition"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            fontSize: 'var(--font-size-md)',
            transition: 'background-color 0.3s ease, color 0.3s ease',
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
