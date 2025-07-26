'use client'

// import { useState, FormEvent } from 'react'
import { useTranslations } from 'next-intl'

export default function ContactPage() {
  const t = useTranslations('Contact')
  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  // const [subject, setSubject] = useState('')
  // const [message, setMessage] = useState('')
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState<string | null>(null)
  // const [success, setSuccess] = useState<string | null>(null)

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault()
  //   setLoading(true)
  //   setError(null)
  //   setSuccess(null)

  //   try {
  //     // Your form submission logic here
  //     // Simulate API call
  //     await new Promise(resolve => setTimeout(resolve, 1000))
  //     setSuccess(t('form.successMessage'))
  //     setName('')
  //     setEmail('')
  //     setSubject('')
  //     setMessage('')
  //   } catch (err) {
  //     setError(t('form.errorMessage'))
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  return (
    <div
      className="h-[calc(100vh-var(--header-height))] py-8 px-4 sm:px-6 lg:px-8"
      style={{
        paddingTop: 'calc(var(--header-height, 80px) + 2rem)',
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
        transition: 'var(--transition)',
      }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl sm:text-5xl font-bold mb-6 transition-colors duration-200 ease-in-out"
            style={{
              background:
                'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t('title')}
          </h1>
          <div
            className="w-20 h-1 mx-auto rounded-full mb-6"
            style={{
              backgroundColor: 'var(--color-primary)',
              transition: 'var(--transition)',
            }}
          ></div>
          <p
            className="text-lg sm:text-xl leading-relaxed transition-colors duration-200 ease-in-out"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* Contact Form */}
        {/* <div
          className="p-8 rounded-2xl mb-8 transition-all duration-200 ease-in-out"
          style={{
            backgroundColor: 'var(--card-background, rgba(255, 255, 255, 0.05))',
            border: '1px solid var(--border, rgba(255, 255, 255, 0.1))',
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 transition-colors duration-200 ease-in-out"
                  style={{ color: 'var(--foreground)' }}
                >
                  {t('form.nameLabel')}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 ease-in-out"
                  style={{
                    backgroundColor: 'var(--background)',
                    color: 'var(--foreground)',
                    borderColor: 'var(--border, rgba(255, 255, 255, 0.2))',
                    fontFamily: 'var(--font-sans)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-primary)'
                    e.currentTarget.style.boxShadow = '0 0 0 2px rgba(var(--color-primary-rgb, 59, 130, 246), 0.2)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border, rgba(255, 255, 255, 0.2))'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 transition-colors duration-200 ease-in-out"
                  style={{ color: 'var(--foreground)' }}
                >
                  {t('form.emailLabel')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 ease-in-out"
                  style={{
                    backgroundColor: 'var(--background)',
                    color: 'var(--foreground)',
                    borderColor: 'var(--border, rgba(255, 255, 255, 0.2))',
                    fontFamily: 'var(--font-sans)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-primary)'
                    e.currentTarget.style.boxShadow = '0 0 0 2px rgba(var(--color-primary-rgb, 59, 130, 246), 0.2)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border, rgba(255, 255, 255, 0.2))'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium mb-2 transition-colors duration-200 ease-in-out"
                style={{ color: 'var(--foreground)' }}
              >
                {t('form.subjectLabel')}
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 ease-in-out"
                style={{
                  backgroundColor: 'var(--background)',
                  color: 'var(--foreground)',
                  borderColor: 'var(--border, rgba(255, 255, 255, 0.2))',
                  fontFamily: 'var(--font-sans)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)'
                  e.currentTarget.style.boxShadow = '0 0 0 2px rgba(var(--color-primary-rgb, 59, 130, 246), 0.2)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border, rgba(255, 255, 255, 0.2))'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2 transition-colors duration-200 ease-in-out"
                style={{ color: 'var(--foreground)' }}
              >
                {t('form.messageLabel')}
              </label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50 resize-vertical transition-all duration-200 ease-in-out"
                style={{
                  backgroundColor: 'var(--background)',
                  color: 'var(--foreground)',
                  borderColor: 'var(--border, rgba(255, 255, 255, 0.2))',
                  fontFamily: 'var(--font-sans)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)'
                  e.currentTarget.style.boxShadow = '0 0 0 2px rgba(var(--color-primary-rgb, 59, 130, 246), 0.2)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border, rgba(255, 255, 255, 0.2))'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 rounded-lg font-semibold disabled:opacity-50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--button-foreground, white)',
              }}
            >
              {loading ? t('form.sending') : t('form.submitButton')}
            </button>

            {error && (
              <div
                className="p-4 rounded-lg text-center transition-all duration-200 ease-in-out"
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                }}
              >
                {error}
              </div>
            )}

            {success && (
              <div
                className="p-4 rounded-lg text-center transition-all duration-200 ease-in-out"
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  color: '#10b981',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                }}
              >
                {success}
              </div>
            )}
          </form>
        </div> */}

        {/* Direct Contact Options */}
        <div
          className="p-6 rounded-2xl text-center transition-all duration-200 ease-in-out"
          style={{
            backgroundColor:
              'var(--card-background, rgba(255, 255, 255, 0.05))',
            border: '1px solid var(--border, rgba(255, 255, 255, 0.1))',
          }}
        >
          <h3
            className="text-lg font-semibold mb-4 transition-colors duration-200 ease-in-out"
            style={{ color: 'var(--foreground)' }}
          >
            {t('directContact.title')}
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`mailto:${t('directContact.email')}`}
              className="flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
              style={{
                color: 'var(--color-primary)',
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border, rgba(255, 255, 255, 0.1))',
              }}
            >
              <span className="text-xl">📧</span>
              <span>{t('directContact.email')}</span>
            </a>

            <a
              href="https://linkedin.com/in/lucas-deletang"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
              style={{
                color: 'var(--color-primary)',
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border, rgba(255, 255, 255, 0.1))',
              }}
            >
              <span className="text-xl">💼</span>
              <span>{t('directContact.linkedinText')}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
