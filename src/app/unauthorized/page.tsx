'use client'

import '../../styles/globals.css'

export default function UnauthorizedPage() {
  return (
    <main
      className="h-[calc(100vh-var(--header-height))] flex flex-col justify-center items-center font-sans px-6"
      style={{
        background: `linear-gradient(
          135deg, 
          var(--color-primary) 0%, 
          var(--color-secondary) 100%
        )`,
        color: 'var(--foreground)',
      }}
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-12 max-w-md w-full text-center border border-red-400 dark:border-red-600">
        <h1 className="text-5xl font-extrabold text-red-600 dark:text-red-400 mb-6">
          Access Denied
        </h1>
        <p className="text-gray-800 dark:text-gray-300 mb-10 text-lg">
          Sorry, you don&apos;t have permission to view this page.
        </p>
        <a
          href="/auth"
          className="inline-block bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-lg transition-shadow shadow-md hover:shadow-lg"
          aria-label="Go to Login"
        >
          Go to Login
        </a>
      </div>
    </main>
  )
}
