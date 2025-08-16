'use client'
import { useEffect, useState } from 'react'
import { LogEntry } from '@/lib/logger'

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([])

  useEffect(() => {
    const es = new EventSource('/api/log/stream')

    es.onmessage = (event) => {
      const log: LogEntry = JSON.parse(event.data)
      setLogs((prev) => [...prev.slice(-99), log]) // keep last 100
    }

    return () => {
      es.close()
    }
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>Live Logs</h1>
      <div>
        {logs.map((log, i) => (
          <div key={i} style={{ marginBottom: '0.5rem' }}>
            <strong>{log.timestamp}</strong> [{LogLevelName(log.level)}]{' '}
            {log.message}
            {log.requestId && ` [req:${log.requestId.slice(0, 8)}]`}
            {log.userId && ` [user:${log.userId}]`}
            {log.data && <pre>{JSON.stringify(log.data, null, 2)}</pre>}
            {log.error && <pre>{log.error.stack || log.error.message}</pre>}
          </div>
        ))}
      </div>
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
