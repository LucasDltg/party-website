'use client'

import React from 'react'

type MainLayoutProps = {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function MainLayout({
  children,
  className = '',
  style = {},
}: MainLayoutProps) {
  return (
    <main
      className={`h-[calc(100vh-var(--header-height))] font-sans ${className}`}
      style={{
        background:
          'linear-gradient(to bottom right, var(--color-primary), var(--color-secondary))',
        color: 'var(--foreground)',
        transition: 'var(--transition)',
        ...style,
      }}
    >
      {children}
    </main>
  )
}
