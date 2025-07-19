import { getDictionary } from '../../../lib/lang/dictionaries'

export default async function Page({
  params,
}: {
  params: { lang: 'en' | 'fr' }
}) {
  const dict = await getDictionary(params.lang)

  return <button>{dict.products.cart}</button>
}
