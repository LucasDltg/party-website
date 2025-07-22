import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
// import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export default function Page() {
  const t = useTranslations('Metadata')
  return (
    <div>
      <h1>{t('description')}</h1>
      <Link href="/contact">Button</Link>
    </div>
  )
}
