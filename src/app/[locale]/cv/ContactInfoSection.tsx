'use client'

import { useTranslations } from 'next-intl'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { COMMON_WORDS } from '@/../messages/constants'
import styles from './cv.module.css'
import { Link } from '@/lib/i18n/navigation'
import LoadingSpinner from '@/components/LoadingSpinner'

interface ContactData {
  location: string
  phone: string
  email: string
}

export default function ContactInfoSection() {
  const t = useTranslations('Cv')
  const { isAuthenticated, isLoading, user } = useAuth()
  const [contact, setContact] = useState<ContactData | null>(null)
  const [loadingContact, setLoadingContact] = useState(false)

  useEffect(() => {
    async function fetchContact() {
      if (isAuthenticated && user) {
        setLoadingContact(true)
        try {
          const token = await user.getIdToken()
          const res = await fetch('/api/contact', {
            headers: { Authorization: `Bearer ${token}` },
          })
          if (res.ok) {
            const data: ContactData = await res.json()
            setContact(data)
          }
        } catch (err) {
          console.error('Failed to fetch contact info', err)
        } finally {
          setLoadingContact(false)
        }
      }
    }
    fetchContact()
  }, [isAuthenticated, user])

  if (isLoading || loadingContact) {
    return (
      <LoadingSpinner
        text={t('loadingContactInfo')}
        containerClassName={styles.contactInfo}
        textClassName={styles.cvLocation}
      />
    )
  }

  if (isAuthenticated && contact) {
    return (
      <div className={styles.contactInfo}>
        <p className={styles.cvLocation}>
          {t('location')}: {contact.location}
        </p>
        <p className={styles.cvPhone}>
          {t('phone')}: {contact.phone}
        </p>
        <p className={styles.cvEmail}>
          {t('email')}: {contact.email}
        </p>
        <p className={styles.cvLinks}>
          <a
            href={COMMON_WORDS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('linkedin')}
          </a>
          {' / '}
          <a href={COMMON_WORDS.url} target="_blank" rel="noopener noreferrer">
            {t('portfolio')}
          </a>
          {' / '}
          <a
            href={COMMON_WORDS.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('github')}
          </a>
        </p>
      </div>
    )
  }

  return (
    <div className={styles.contactInfo}>
      <div
        className={`${styles.loginPrompt} bg-blue-50 border border-blue-200 rounded-lg p-4 text-center`}
      >
        <p className="text-blue-800 mb-2">{t('contactInfoMessage')}</p>
        <Link
          href={`/auth?redirect=${encodeURIComponent(window.location.pathname)}`}
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          {t('loginToViewContact')}
        </Link>
      </div>
    </div>
  )
}
