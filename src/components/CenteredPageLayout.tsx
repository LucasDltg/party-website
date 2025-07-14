'use client'

import '../styles/globals.css'

type CenteredPageLayoutProps = {
  children: React.ReactNode
}

export default function CenteredPageLayout({
  children,
}: CenteredPageLayoutProps) {
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
        {children}
      </div>
    </main>
  )
}
