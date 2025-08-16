'use client'

import { useEffect, useState, useRef } from 'react'
import { LogEntry } from '@/lib/logger'

const MAX_LOGS = 100

export function LogsPanel() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const es = new EventSource('/api/log/stream')

    es.onmessage = (event) => {
      const log: LogEntry = JSON.parse(event.data)
      setLogs((prev) => [...prev, log].slice(-MAX_LOGS))
    }

    return () => es.close()
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [logs])

  return (
    <div
      style={{
        padding: 'var(--spacing-md)',
        fontFamily: 'var(--font-mono)',
        color: 'var(--color-font)',
        backgroundColor: 'var(--background)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-md)',
        transition: 'var(--transition)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2
        style={{
          fontSize: 'var(--font-size-lg)',
          color: 'var(--color-primary)',
          marginBottom: 'var(--spacing-md)',
        }}
      >
        Live Logs
      </h2>

      <div
        ref={containerRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingRight: 'var(--spacing-sm)',
        }}
      >
        {logs.map((log, i) => (
          <LogCard key={i} log={log} />
        ))}
      </div>
    </div>
  )
}

function LogCard({ log }: { log: LogEntry }) {
  return (
    <div
      style={{
        padding: 'var(--spacing-sm)',
        marginBottom: 'var(--spacing-xs)',
        borderRadius: 'var(--radius-md)',
        backgroundColor: getCardBackgroundColor(log.level),
        boxShadow: 'var(--shadow-md)',
        transition: 'var(--transition)',
        color: 'var(--color-font)',
      }}
    >
      <div style={{ marginBottom: 'var(--spacing-xs)' }}>
        <strong>{log.timestamp}</strong>{' '}
        <span
          style={{
            color: getLevelColor(log.level),
            fontWeight: 'bold',
            transition: 'var(--transition)',
          }}
        >
          [{LogLevelName(log.level)}]
        </span>{' '}
        {log.message}
      </div>
      {log.context && (
        <div
          style={{
            fontStyle: 'italic',
            color: 'var(--color-secondary)',
            marginBottom: 'var(--spacing-xs)',
            transition: 'var(--transition)',
          }}
        >
          Context: {log.context}
        </div>
      )}
      {log.requestId && (
        <span
          style={{
            color: 'var(--color-muted)',
            transition: 'var(--transition)',
          }}
        >
          [req:{log.requestId.slice(0, 8)}]
        </span>
      )}{' '}
      {log.userId && (
        <span
          style={{
            color: 'var(--color-muted)',
            transition: 'var(--transition)',
          }}
        >
          [user:{log.userId}]
        </span>
      )}
      {log.data && (
        <pre
          style={{
            backgroundColor: '#f5f5f5',
            padding: 'var(--spacing-sm)',
            borderRadius: 'var(--radius-md)',
            overflowX: 'auto',
            transition: 'var(--transition)',
          }}
        >
          {JSON.stringify(log.data, null, 2)}
        </pre>
      )}
      {log.error && (
        <pre
          style={{
            color: 'var(--color-error)',
            backgroundColor: '#fee',
            padding: 'var(--spacing-sm)',
            borderRadius: 'var(--radius-md)',
            overflowX: 'auto',
            transition: 'var(--transition)',
          }}
        >
          {log.error.stack || log.error.message}
        </pre>
      )}
    </div>
  )
}

function LogLevelName(level: number) {
  switch (level) {
    case 0:
      return 'DEBUG'
    case 1:
      return 'INFO'
    case 2:
      return 'WARN'
    case 3:
      return 'ERROR'
    case 4:
      return 'FATAL'
    default:
      return 'UNKNOWN'
  }
}

function getLevelColor(level: number) {
  switch (level) {
    case 0:
      return 'var(--color-font)'
    case 1:
      return 'var(--color-primary)'
    case 2:
      return 'var(--color-secondary)'
    case 3:
      return 'var(--color-error)'
    case 4:
      return 'darkred'
    default:
      return 'var(--color-font)'
  }
}

function getCardBackgroundColor(level: number) {
  switch (level) {
    case 0:
      return '#f9f9f9'
    case 1:
      return '#e0f2fe'
    case 2:
      return '#fff7ed'
    case 3:
      return '#fee2e2'
    case 4:
      return '#fbcaca'
    default:
      return 'white'
  }
}
