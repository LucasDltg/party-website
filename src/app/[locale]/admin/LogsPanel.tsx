'use client'

import { useEffect, useState, useRef } from 'react'
import { LogEntry, LogLevel } from '@/lib/logger'

const MAX_LOGS = 100

type SortField =
  | 'timestamp'
  | 'level'
  | 'message'
  | 'context'
  | 'requestId'
  | 'userId'
type SortDirection = 'asc' | 'desc'

export function LogsPanel() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [sortField, setSortField] = useState<SortField>('timestamp')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [filter, setFilter] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let isMounted = true

    fetch(`/api/logs?limit=${MAX_LOGS}`)
      .then((res) => res.json())
      .then((data: LogEntry[]) => {
        if (isMounted) setLogs(data)
      })
      .catch((err) => console.error('Failed to fetch logs:', err))

    const es = new EventSource('/api/logs/stream')
    es.onmessage = (event) => {
      const log: LogEntry = JSON.parse(event.data)
      setLogs((prev) => [...prev, log].slice(-MAX_LOGS))
    }

    return () => {
      isMounted = false
      es.close()
    }
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [logs])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const sortedAndFilteredLogs = logs
    .filter((log) => {
      if (!filter) return true
      const searchText = filter.toLowerCase()
      return (
        log.message.toLowerCase().includes(searchText) ||
        log.context?.toLowerCase().includes(searchText) ||
        log.requestId?.toLowerCase().includes(searchText) ||
        log.sessionId?.toLowerCase().includes(searchText) ||
        LogLevelName(log.level).toLowerCase().includes(searchText)
      )
    })
    .sort((a, b) => {
      let aValue: string | number, bValue: string | number

      switch (sortField) {
        case 'timestamp':
          aValue = new Date(a.timestamp).getTime()
          bValue = new Date(b.timestamp).getTime()
          break
        case 'level':
          aValue = a.level
          bValue = b.level
          break
        case 'message':
          aValue = a.message.toLowerCase()
          bValue = b.message.toLowerCase()
          break
        case 'context':
          aValue = a.context?.toLowerCase() || ''
          bValue = b.context?.toLowerCase() || ''
          break
        case 'requestId':
          aValue = a.requestId || ''
          bValue = b.requestId || ''
          break
        case 'userId':
          aValue = a.sessionId || ''
          bValue = b.sessionId || ''
          break
        default:
          return 0
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

  const SortIcon = ({ field }: { field: SortField }) => (
    <span style={{ marginLeft: '4px', opacity: sortField === field ? 1 : 0.3 }}>
      {sortField === field && sortDirection === 'asc' ? '↑' : '↓'}
    </span>
  )

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)',
          padding: '20px',
          borderBottom: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        <h2
          style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#2d3748',
            margin: '0 0 16px 0',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          🚀 Live Logs
        </h2>

        {/* Search Filter */}
        <input
          type="text"
          placeholder="🔍 Filter logs..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '12px',
            border: '2px solid rgba(102, 126, 234, 0.2)',
            fontSize: '14px',
            outline: 'none',
            transition: 'all 0.3s ease',
            background: 'rgba(255,255,255,0.8)',
          }}
        />
      </div>

      {/* Sort Controls */}
      <div
        style={{
          background: 'rgba(255,255,255,0.9)',
          padding: '12px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.2)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        {(
          [
            'timestamp',
            'level',
            'message',
            'context',
            'requestId',
            'userId',
          ] as SortField[]
        ).map((field) => (
          <button
            key={field}
            onClick={() => handleSort(field)}
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              border: 'none',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              background:
                sortField === field
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'rgba(102, 126, 234, 0.1)',
              color: sortField === field ? 'white' : '#667eea',
              textTransform: 'capitalize',
            }}
          >
            {field}
            <SortIcon field={field} />
          </button>
        ))}
      </div>

      {/* Logs Container */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          background: 'rgba(255,255,255,0.05)',
        }}
      >
        {sortedAndFilteredLogs.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '16px',
              marginTop: '40px',
            }}
          >
            {filter ? '🔍 No logs match your filter' : '📝 No logs yet...'}
          </div>
        ) : (
          sortedAndFilteredLogs.map((log, i) => <LogCard key={i} log={log} />)
        )}
      </div>
    </div>
  )
}

function LogCard({ log }: { log: LogEntry }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        marginBottom: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        border: `2px solid ${getLevelBorderColor(log.level)}`,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Main Content */}
      <div style={{ padding: '16px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                padding: '4px 12px',
                borderRadius: '20px',
                background: getLevelGradient(log.level),
                color: 'white',
                fontSize: '11px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              {getLevelEmoji(log.level)} {LogLevelName(log.level)}
            </div>
            <div
              style={{
                fontSize: '12px',
                color: '#718096',
                fontFamily: 'monaco, monospace',
              }}
            >
              {new Date(log.timestamp).toLocaleString()}
            </div>
          </div>
          <div style={{ fontSize: '20px' }}>{isExpanded ? '🔼' : '🔽'}</div>
        </div>

        <div
          style={{
            fontSize: '14px',
            color: '#2d3748',
            fontWeight: '500',
            lineHeight: '1.5',
            marginBottom: '8px',
          }}
        >
          {log.message}
        </div>

        {/* Metadata */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {log.context && (
            <span
              style={{
                padding: '2px 8px',
                background: 'rgba(102, 126, 234, 0.1)',
                color: '#667eea',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: '600',
              }}
            >
              📝 {log.context}
            </span>
          )}
          {log.requestId && (
            <span
              style={{
                padding: '2px 8px',
                background: 'rgba(72, 187, 120, 0.1)',
                color: '#48bb78',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: '600',
              }}
            >
              🔗 {log.requestId}
            </span>
          )}
          {log.sessionId && (
            <span
              style={{
                padding: '2px 8px',
                background: 'rgba(128, 90, 213, 0.1)',
                color: '#805ad5',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: '600',
              }}
            >
              👤 {log.sessionId}
            </span>
          )}
        </div>
      </div>

      {/* Expandable Content */}
      {isExpanded && (log.data || log.error) && (
        <div
          style={{
            borderTop: '1px solid rgba(0,0,0,0.1)',
            background: 'rgba(0,0,0,0.02)',
          }}
        >
          {log.data && (
            <div style={{ padding: '16px' }}>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#4a5568',
                  marginBottom: '8px',
                }}
              >
                📊 Data:
              </div>
              <pre
                style={{
                  background: 'rgba(0,0,0,0.05)',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: '#2d3748',
                  overflow: 'auto',
                  fontFamily: 'monaco, monospace',
                  lineHeight: '1.4',
                  margin: 0,
                }}
              >
                {JSON.stringify(log.data, null, 2)}
              </pre>
            </div>
          )}
          {log.error && (
            <div style={{ padding: '16px' }}>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#e53e3e',
                  marginBottom: '8px',
                }}
              >
                ❌ Error:
              </div>
              <pre
                style={{
                  background: 'rgba(229, 62, 62, 0.1)',
                  color: '#c53030',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  overflow: 'auto',
                  fontFamily: 'monaco, monospace',
                  lineHeight: '1.4',
                  margin: 0,
                  border: '1px solid rgba(229, 62, 62, 0.2)',
                }}
              >
                {log.error.stack || log.error.message}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function LogLevelName(level: LogLevel): string {
  switch (level) {
    case 0:
      return 'Debug'
    case 1:
      return 'Info'
    case 2:
      return 'Warn'
    case 3:
      return 'Error'
    case 4:
      return 'Fatal'
    default:
      return 'Unknown'
  }
}

function getLevelEmoji(level: LogLevel): string {
  switch (level) {
    case 0:
      return '🔍'
    case 1:
      return 'ℹ️'
    case 2:
      return '⚠️'
    case 3:
      return '❌'
    case 4:
      return '💀'
    default:
      return '❓'
  }
}

function getLevelGradient(level: LogLevel): string {
  switch (level) {
    case 0:
      return 'linear-gradient(135deg, #718096 0%, #4a5568 100%)'
    case 1:
      return 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)'
    case 2:
      return 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)'
    case 3:
      return 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)'
    case 4:
      return 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)'
    default:
      return 'linear-gradient(135deg, #a0aec0 0%, #718096 100%)'
  }
}

function getLevelBorderColor(level: LogLevel): string {
  switch (level) {
    case 0:
      return 'rgba(113, 128, 150, 0.3)'
    case 1:
      return 'rgba(66, 153, 225, 0.3)'
    case 2:
      return 'rgba(237, 137, 54, 0.3)'
    case 3:
      return 'rgba(245, 101, 101, 0.3)'
    case 4:
      return 'rgba(229, 62, 62, 0.5)'
    default:
      return 'rgba(160, 174, 192, 0.3)'
  }
}
