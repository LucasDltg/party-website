import { useTranslations } from 'next-intl'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { COMMON_CONST } from '@/../messages/constants'
import styles from './cv.module.css'
import LoadingSpinner from '@/components/LoadingSpinner'
import AuthGuard from '@/components/AuthGuard'
import { Link } from '@/lib/i18n/navigation'
import { usePathname } from 'next/navigation'

interface ContactData {
  location: string
  phone: string
  email: string
}

function ContactInfoContent() {
  const t = useTranslations('Cv')
  const { user } = useAuth()
  const [contact, setContact] = useState<ContactData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchContact() {
      if (!user) return

      setLoading(true)
      try {
        const res = await fetch('/api/cv-contact')
        if (res.ok) {
          const data: ContactData = await res.json()
          setContact(data)
        } else {
          console.error('Failed to fetch contact info:', res.status)
        }
      } catch (err) {
        console.error('Failed to fetch contact info', err)
      } finally {
        setLoading(false)
      }
    }

    fetchContact()
  }, [user])

  if (loading) {
    return (
      <div className={styles.contactInfo}>
        <LoadingSpinner
          text={t('CvAuth.loadingContactInfo')}
          containerClassName={styles.contactInfo}
          textClassName={styles.cvLocation}
        />
      </div>
    )
  }

  if (!contact) {
    return (
      <p className={styles.cvLocation} style={{ textAlign: 'center' }}>
        {t('CvAuth.noContactInfo')}
      </p>
    )
  }

  return (
    <div className={styles.contactInfo}>
      <p className={styles.cvLocation}>
        {t('Common.location')}: {contact.location}
      </p>
      <p className={styles.cvPhone}>
        {t('Common.phone')}: {contact.phone}
      </p>
      <p className={styles.cvEmail}>
        {t('Common.email')}: {contact.email}
      </p>
      <p className={styles.cvLinks}>
        <a
          href={COMMON_CONST.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('Common.linkedin')}
        </a>
        {' / '}
        <a href={COMMON_CONST.url} target="_blank" rel="noopener noreferrer">
          {t('Common.portfolio')}
        </a>
        {' / '}
        <a href={COMMON_CONST.github} target="_blank" rel="noopener noreferrer">
          {t('Common.github')}
        </a>
      </p>
    </div>
  )
}

export default function ContactInfoSection() {
  const t = useTranslations('Cv')
  const pathname = usePathname()

  const guestView = (
    <div
      className={styles.contactInfo}
      style={{ padding: 'var(--spacing-md)' }}
    >
      <div
        style={{
          maxWidth: '400px',
          margin: '0 auto',
          background: 'var(--color-box)',
          border: `1px solid var(--color-muted)`,
          borderRadius: 'var(--radius-md)',
          padding: 'var(--spacing-md)',
          textAlign: 'center',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <p
          style={{
            color: 'var(--color-font)',
            fontSize: 'var(--font-size-md)',
            marginBottom: 'var(--spacing-md)',
          }}
        >
          {t('CvAuth.contactInfoMessage')}
        </p>
        <Link
          href={`/auth?redirect=${encodeURIComponent(pathname)}`}
          className={styles.loginButton}
        >
          {t('CvAuth.loginToViewContact')}
        </Link>
      </div>
    </div>
  )

  const loadingView = (
    <div className={styles.contactInfo}>
      <LoadingSpinner
        text={t('CvAuth.loadingContactInfo')}
        containerClassName={styles.contactInfo}
        textClassName={styles.cvLocation}
      />
    </div>
  )

  return (
    <AuthGuard
      requireAuth={true}
      guestView={guestView}
      loadingView={loadingView}
    >
      <ContactInfoContent />
    </AuthGuard>
  )
}
