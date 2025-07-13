'use client'

import '../styles/globals.css'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="h-[calc(100vh-var(--header-height))] overflow-hidden flex flex-col justify-center items-center bg-gradient-to-tr from-red-400 to-red-700 font-sans px-4">
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-md w-full text-center">
        <h1 className="text-4xl font-extrabold text-red-600 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-700 mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link
          href="/"
          className="inline-block bg-red-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-red-700 transition"
        >
          Go Home
        </Link>
      </div>
    </main>
  )
}
