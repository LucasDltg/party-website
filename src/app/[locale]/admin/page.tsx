// pages/admin/AdminPage.tsx - Protected admin page
'use client'

import { useTranslations } from 'next-intl'
import { useAuth } from '@/hooks/useAuth'
import AuthGuard from '@/components/AuthGuard'
import { LogsPanel } from './LogsPanel'
import { IpLogsPanel } from './IpLogsPanel'
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
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">IP Logs</h2>
        <IpLogsPanel />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Live Logs</h2>
        <LogsPanel />
      </div>
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
