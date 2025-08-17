'use client'

import MainLayout from './MainLayout'

type CenteredPageLayoutProps = {
  children: React.ReactNode
}

export default function CenteredPageLayout({
  children,
}: CenteredPageLayoutProps) {
  return (
    <MainLayout className="flex flex-col justify-center items-center">
      <div
        className="rounded-xl p-10 max-w-md w-full text-center"
        style={{
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
          transition: 'var(--transition)',
        }}
      >
        {children}
      </div>
    </MainLayout>
  )
}
