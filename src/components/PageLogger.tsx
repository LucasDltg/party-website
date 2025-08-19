// components/PageLogger.tsx
'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

interface PageLoggerProps {
  locale: string
}

// Type definitions for browser APIs that may not be fully supported
interface NetworkConnection {
  effectiveType?: string
  downlink?: number
  rtt?: number
  saveData?: boolean
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkConnection
}

const PageLogger = ({ locale }: PageLoggerProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPathRef = useRef<string>('')

  useEffect(() => {
    const logPageVisit = async () => {
      try {
        // Only proceed if pathname starts with the locale
        if (!pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`) {
          console.log(`🔄 Skipping non-localized route: ${pathname}`)
          return
        }

        const fullPath =
          pathname +
          (searchParams.toString() ? `?${searchParams.toString()}` : '')

        // Prevent duplicate logs for the same path session
        if (currentPathRef.current === fullPath) {
          return
        }

        // Wait and verify route stability
        await new Promise((resolve) => setTimeout(resolve, 200))

        const currentPathname = window.location.pathname
        const currentSearch = window.location.search
        const currentFullPath = currentPathname + currentSearch

        if (currentFullPath !== fullPath) {
          console.log(
            `🔄 Route changed during wait: ${fullPath} -> ${currentFullPath}`,
          )
          return
        }

        // Final localization check
        if (
          !currentPathname.startsWith(`/${locale}/`) &&
          currentPathname !== `/${locale}`
        ) {
          console.log(`🔄 Current path not localized: ${currentPathname}`)
          return
        }

        // Get client info
        const userAgent = navigator.userAgent
        const referrer = document.referrer || 'direct'

        // Get screen info
        const screenInfo = {
          width: window.screen.width,
          height: window.screen.height,
          availWidth: window.screen.availWidth,
          availHeight: window.screen.availHeight,
          colorDepth: window.screen.colorDepth,
          pixelDepth: window.screen.pixelDepth,
        }

        // Get viewport info
        const viewportInfo = {
          width: window.innerWidth,
          height: window.innerHeight,
        }

        // Get performance data
        const performanceData = {
          loadTime: performance.timing
            ? performance.timing.loadEventEnd -
              performance.timing.navigationStart
            : null,
          domContentLoaded: performance.timing
            ? performance.timing.domContentLoadedEventEnd -
              performance.timing.navigationStart
            : null,
          firstPaint: performance.getEntriesByType
            ? performance
                .getEntriesByType('paint')
                .find((entry) => entry.name === 'first-paint')?.startTime
            : null,
        }

        // Get connection info (if available)
        const navigatorWithConnection = navigator as NavigatorWithConnection
        const connectionInfo = navigatorWithConnection.connection
          ? {
              effectiveType: navigatorWithConnection.connection.effectiveType,
              downlink: navigatorWithConnection.connection.downlink,
              rtt: navigatorWithConnection.connection.rtt,
              saveData: navigatorWithConnection.connection.saveData,
            }
          : null

        // Prepare the data to send
        const visitData = {
          path: fullPath,
          locale,
          userAgent: userAgent.substring(0, 200),
          referrer,
          screen: screenInfo,
          viewport: viewportInfo,
          language: navigator.language,
          languages: navigator.languages,
          cookieEnabled: navigator.cookieEnabled,
          onLine: navigator.onLine,
          platform: navigator.platform,
          performance: performanceData,
          connection: connectionInfo,
          additionalData: {
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            hardwareConcurrency: navigator.hardwareConcurrency,
            maxTouchPoints: navigator.maxTouchPoints,
            doNotTrack: navigator.doNotTrack,
          },
        }

        // Send to the specialized logging endpoint
        const response = await fetch('/api/logs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
          },
          body: JSON.stringify({
            level: 'INFO',
            message: `Page visit: ${visitData.path}`,
            data: visitData,
            requestId: uuidv4(),
            context: 'PageVisit',
            includeServerData: true,
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        currentPathRef.current = fullPath
      } catch (error) {
        console.error('❌ Failed to log page visit:', error)
      }
    }

    const timeoutId = setTimeout(logPageVisit, 100)

    return () => clearTimeout(timeoutId)
  }, [pathname, searchParams, locale])

  // Page exit logging ?

  return null
}

export default PageLogger
