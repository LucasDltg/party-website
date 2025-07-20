// src/app/[lang]/[...slug]/page.tsx
import { notFound } from 'next/navigation'

type PageProps = {
  params: {
    lang: string
    slug?: string[]
  }
}

export default function CatchAllPage({ params }: PageProps) {
  console.log('Caught params:', params)
  // params.lang = 'en'
  // params.slug = ['some', 'random', 'path'] or undefined

  // Validate slug or lang here
  notFound()
}
