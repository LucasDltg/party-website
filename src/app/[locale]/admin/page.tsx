// pages/admin/AdminPage.tsx - Protected admin page
'use client'

import { useTranslations } from 'next-intl'
import { useAuth } from '@/hooks/useAuth'
import AuthGuard from '@/components/AuthGuard'
import { LogsPanel } from './LogsPanel'
import MainLayout from '@/components/MainLayout'

function AdminContent() {
  const t = useTranslations('Admin')
  const { user } = useAuth()

  return (
    <MainLayout style={{ background: 'var(--background)' }}>
      <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
      <p>
        {t('welcome')} <strong>{user?.email}</strong>! {t('adminAccess')}
      </p>
      <LogsPanel />
    </MainLayout>
  )
}

export default function AdminPage() {
  return (
    <AuthGuard requiredRole="admin">
      <AdminContent />
    </AuthGuard>
  )
}

// -- Get all unique server IPs in MariaDB
// SELECT DISTINCT JSON_UNQUOTE(JSON_EXTRACT(data, '$.server.ip')) AS ip
// FROM logs
// WHERE JSON_EXTRACT(data, '$.server.ip') IS NOT NULL;
