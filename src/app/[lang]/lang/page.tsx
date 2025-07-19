import { getDictionary } from '../../../lib/lang/dictionaries'

export default async function Page({
  params,
}: {
  params: Promise<{ lang: 'en' | 'fr' }>
}) {
  const p = await params
  const dict = await getDictionary(p.lang)

  return <button>{dict.products.cart}</button>
}
