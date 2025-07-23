'use client'

import { useTranslations } from 'next-intl'
import CenteredPageLayout from '../../components/CenteredPageLayout'
import Link from 'next/link'

export default function NotFound() {
  const t = useTranslations('NotFound')

  return (
    <CenteredPageLayout>
      <h1
        className="font-extrabold mb-4"
        style={{
          color: 'var(--color-primary)',
          fontSize: 'var(--font-size-lg)',
        }}
      >
        {t('title')}
      </h1>
      <p
        className="mb-8"
        style={{
          color: 'var(--foreground-color)', // Fixed typo from 'foregroung-color'
          fontSize: 'var(--font-size-md)',
        }}
      >
        {t('message')}
      </p>
      <Link
        href="/"
        className="inline-block font-semibold px-6 py-3 rounded-md"
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          fontSize: 'var(--font-size-md)',
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)')
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = 'var(--color-primary)')
        }
      >
        {t('goHomeButton')}
      </Link>
    </CenteredPageLayout>
  )
}
