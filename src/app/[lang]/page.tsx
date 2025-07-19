'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div
      className="flex flex-col"
      style={{
        paddingTop: 'var(--header-height)',
        minHeight: 'calc(100vh - var(--header-height))',
      }}
    >
      <main
        className="flex-grow px-4 pb-12 font-sans flex flex-col gap-16"
        style={{
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
          transition: 'var(--transition)',
        }}
      >
        <section className="flex flex-col gap-10 items-center text-center sm:text-left sm:items-start">
          <Link
            href="/cv"
            className="rounded-full px-6 py-2 text-sm font-medium w-full sm:w-auto text-center"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--button-foreground)',
              transition: 'var(--transition)',
            }}
          >
            View My CV
          </Link>
        </section>
      </main>

      <footer
        className="flex justify-center text-sm pb-6"
        style={{ color: 'var(--muted-foreground)' }}
      >
        <p>© {new Date().getFullYear()} Lucas Deletang</p>
      </footer>
    </div>
  )
}
