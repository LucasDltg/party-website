// pages/admin/AdminPage.tsx - Protected admin page
'use client'

import { useTranslations } from 'next-intl'
import { useAuth } from '@/hooks/useAuth'
import AuthGuard from '@/components/AuthGuard'

function AdminContent() {
  const t = useTranslations('Admin')
  const { user } = useAuth()

  return (
    <main className="h-[calc(100vh-var(--header-height))] overflow-auto p-8 font-sans">
      <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
      <p>
        {t('welcome')} <strong>{user?.email}</strong>! {t('adminAccess')}
      </p>
    </main>
  )
}

export default function AdminPage() {
  return (
    <AuthGuard requiredRole="admin">
      <AdminContent />
    </AuthGuard>
  )
}
