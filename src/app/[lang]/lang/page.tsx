import { getDictionary } from '@/lib/locale/locale'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Locale } from '@/config/i18n'

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const p = await params
  const dict = await getDictionary(p.lang)

  return (
    <>
      <h1>{dict.metadata.title.default}</h1>
      <LanguageSwitcher />
    </>
  )
}
