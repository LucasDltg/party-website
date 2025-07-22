import path from 'path'
import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'

// Base Next.js config
const baseConfig: NextConfig = {
  output: 'standalone',
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, 'src'),
    }
    return config
  },
}

// Wrap config with next-intl plugin
const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts')

export default withNextIntl(baseConfig)
