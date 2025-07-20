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
          transition: 'var(--transition)',
        }}
      >
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto pt-16 pb-24">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
                style={{
                  background:
                    'linear-gradient(135deg, var(--color-primary), #6366f1, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Lucas Deletang
              </h1>
              <div
                className="w-24 h-1 mx-auto rounded-full"
                style={{ backgroundColor: 'var(--color-primary)' }}
              ></div>
            </div>

            <p
              className="text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Full-stack developer crafting modern web experiences with
              cutting-edge technologies. Passionate about creating intuitive,
              scalable solutions that make a difference.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link
                href="/cv"
                className="group relative overflow-hidden rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--button-foreground)',
                }}
              >
                <span className="relative z-10">View My CV</span>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ backgroundColor: 'white' }}
                ></div>
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
        <section className="max-w-6xl mx-auto py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Site Features
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
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
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--button-foreground)',
                  }}
                >
                  🔐
                </div>
                <h3 className="text-xl font-semibold">Secure Authentication</h3>
                <p style={{ color: 'var(--muted-foreground)' }}>
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
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--button-foreground)',
                  }}
                >
                  🌍
                </div>
                <h3 className="text-xl font-semibold">Internationalization</h3>
                <p style={{ color: 'var(--muted-foreground)' }}>
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
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--button-foreground)',
                  }}
                >
                  📄
                </div>
                <h3 className="text-xl font-semibold">Interactive CV</h3>
                <p style={{ color: 'var(--muted-foreground)' }}>
                  Dynamic curriculum vitae with detailed professional
                  experience, skills, and achievements presentation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats or Additional Info Section */}
        <section className="max-w-4xl mx-auto py-16 text-center">
          <div
            className="rounded-3xl p-12"
            style={{
              background:
                'linear-gradient(135deg, var(--color-primary), #6366f1)',
              color: 'var(--button-foreground)',
            }}
          >
            <h3 className="text-3xl font-bold mb-4">Ready to Collaborate?</h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              I&apos;m always interested in new opportunities and exciting
              projects. Let&apos;s discuss how we can work together to bring
              your ideas to life.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-opacity-90 transition-all duration-300 hover:scale-105"
            >
              Start a Conversation
            </Link>
          </div>
        </section>
      </main>

      <footer
        className="flex justify-center text-sm pb-6 px-6"
        style={{ color: 'var(--muted-foreground)' }}
      >
        <p>© {new Date().getFullYear()} Lucas Deletang.</p>
      </footer>
    </div>
  )
}
