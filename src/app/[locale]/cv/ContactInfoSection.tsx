import { useTranslations } from 'next-intl'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { COMMON_WORDS } from '@/../messages/constants'
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
          text={t('loadingContactInfo')}
          containerClassName={styles.contactInfo}
          textClassName={styles.cvLocation}
        />
      </div>
    )
  }

  if (!contact) {
    return (
      <p className={styles.cvLocation} style={{ textAlign: 'center' }}>
        {t('noContactInfo')}
      </p>
    )
  }

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
        <a href={COMMON_WORDS.github} target="_blank" rel="noopener noreferrer">
          {t('github')}
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
          {t('contactInfoMessage')}
        </p>
        <Link
          href={`/auth?redirect=${encodeURIComponent(pathname)}`}
          className={styles.loginButton}
        >
          {t('loginToViewContact')}
        </Link>
      </div>
    </div>
  )

  const loadingView = (
    <div className={styles.contactInfo}>
      <LoadingSpinner
        text={t('loadingContactInfo')}
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
