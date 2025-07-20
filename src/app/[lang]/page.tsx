'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <div
      className="flex flex-col"
      style={{
        paddingTop: 'var(--header-height)',
        minHeight: 'calc(100vh - var(--header-height))',
      }}
    >
      <main
        className="flex-grow px-6 sm:px-8 lg:px-12 pb-16 font-sans"
        style={{
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
          transition:
            'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
        }}
      >
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto pt-16 pb-24">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight pb-4 transition-all duration-200 ease-in-out"
                style={{
                  background:
                    'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Lucas Deletang
              </h1>
              <div
                className="w-24 h-1 mx-auto rounded-full transition-all duration-200 ease-in-out"
                style={{
                  background:
                    'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                }}
              ></div>
            </div>

            <p
              className="text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed transition-colors duration-200 ease-in-out"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Full-stack developer specialized in A.I.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link
                href="/cv"
                className="px-8 py-4 text-lg font-semibold rounded-full border-2 transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: 'var(--color-primary)',
                  color: 'var(--color-primary)',
                  backgroundColor: 'transparent',
                }}
              >
                View My CV
              </Link>

              <Link
                href="/contact"
                className="px-8 py-4 text-lg font-semibold rounded-full border-2 transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: 'var(--color-primary)',
                  color: 'var(--color-primary)',
                  backgroundColor: 'transparent',
                }}
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 transition-colors duration-200 ease-in-out">
              Site Features
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto transition-colors duration-200 ease-in-out"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Built with modern technologies and best practices for optimal
              performance and user experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="group p-8 rounded-2xl transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor:
                  'var(--card-background, rgba(255, 255, 255, 0.05))',
                border: '1px solid var(--border, rgba(255, 255, 255, 0.1))',
              }}
            >
              <div className="space-y-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-colors duration-200 ease-in-out"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--button-foreground)',
                  }}
                >
                  🔐
                </div>
                <h3 className="text-xl font-semibold transition-colors duration-200 ease-in-out">
                  Secure Authentication
                </h3>
                <p
                  className="transition-colors duration-200 ease-in-out"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Firebase-powered authentication system with secure login,
                  registration, and user management capabilities.
                </p>
              </div>
            </div>

            <div
              className="group p-8 rounded-2xl transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor:
                  'var(--card-background, rgba(255, 255, 255, 0.05))',
                border: '1px solid var(--border, rgba(255, 255, 255, 0.1))',
              }}
            >
              <div className="space-y-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-colors duration-200 ease-in-out"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--button-foreground)',
                  }}
                >
                  🌍
                </div>
                <h3 className="text-xl font-semibold transition-colors duration-200 ease-in-out">
                  Internationalization
                </h3>
                <p
                  className="transition-colors duration-200 ease-in-out"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Multi-language support with seamless localization, making the
                  site accessible to a global audience.
                </p>
              </div>
            </div>

            <div
              className="group p-8 rounded-2xl transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor:
                  'var(--card-background, rgba(255, 255, 255, 0.05))',
                border: '1px solid var(--border, rgba(255, 255, 255, 0.1))',
              }}
            >
              <div className="space-y-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-colors duration-200 ease-in-out"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--button-foreground)',
                  }}
                >
                  📄
                </div>
                <h3 className="text-xl font-semibold transition-colors duration-200 ease-in-out">
                  Interactive CV
                </h3>
                <p
                  className="transition-colors duration-200 ease-in-out"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  Dynamic curriculum vitae with detailed professional
                  experience, skills, and achievements presentation.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer
        className="flex justify-center text-sm pb-6 px-6 transition-colors duration-200 ease-in-out"
        style={{ color: 'var(--muted-foreground)' }}
      >
        <p>© {new Date().getFullYear()} Lucas Deletang.</p>
      </footer>
    </div>
  )
}
