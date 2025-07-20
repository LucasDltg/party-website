import { getDictionary } from '@/lib/locale/locale'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export default async function Page({
  params,
}: {
  params: Promise<{ lang: 'en' | 'fr' }>
}) {
  const p = await params
  const dict = await getDictionary(p.lang)

  return (
    <>
      <h1>{dict.products.cart}</h1>
      <LanguageSwitcher />
    </>
  )
}
