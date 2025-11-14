'use client'

import { useEffect, useState, useRef } from 'react'

interface IpLog {
  ip_text: string
  country_name?: string
  region_name?: string
  city_name?: string
  isp?: string
  created_at: string
}

export function IpLogsPanel() {
  const [logs, setLogs] = useState<IpLog[]>([])
  const [filter, setFilter] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchLogs() {
      try {
        const res = await fetch(`/api/logs/ip`)
        const data: IpLog[] = await res.json()
        if (isMounted) setLogs(data)
      } catch (err) {
        console.error('Failed to fetch IP logs:', err)
      }
    }

    fetchLogs()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [logs])

  const filteredLogs = logs.filter((log) => {
    if (!filter) return true
    const search = filter.toLowerCase()
    return (
      log.ip_text.toLowerCase().includes(search) ||
      log.country_name?.toLowerCase().includes(search) ||
      log.region_name?.toLowerCase().includes(search) ||
      log.city_name?.toLowerCase().includes(search) ||
      log.isp?.toLowerCase().includes(search)
    )
  })

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
          🌐 IP Logs
        </h2>

        {/* Search Filter */}
        <input
          type="text"
          placeholder="🔍 Filter IPs..."
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
            background: 'rgba(0, 0, 0, 0.8)',
          }}
        />
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
        {filteredLogs.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '16px',
              marginTop: '40px',
            }}
          >
            {filter ? '🔍 No IPs match your filter' : '📝 No IP logs yet...'}
          </div>
        ) : (
          filteredLogs.map((log, i) => <IpCard key={i} log={log} />)
        )}
      </div>
    </div>
  )
}

function IpCard({ log }: { log: IpLog }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        marginBottom: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        border: '2px solid rgba(66, 153, 225, 0.3)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div style={{ padding: '16px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              fontFamily: 'monaco, monospace',
              color: '#718096',
            }}
          >
            {log.ip_text} — {new Date(log.created_at).toLocaleString()} -{' '}
            {log.country_name}
          </div>
          <div style={{ fontSize: '20px' }}>{isExpanded ? '🔼' : '🔽'}</div>
        </div>

        {isExpanded && (
          <div style={{ fontSize: '14px', color: '#2d3748', lineHeight: 1.5 }}>
            <div>🌍 Country: {log.country_name || '-'}</div>
            <div>🏙️ Region: {log.region_name || '-'}</div>
            <div>🏘️ City: {log.city_name || '-'}</div>
            <div>💻 ISP: {log.isp || '-'}</div>
          </div>
        )}
      </div>
    </div>
  )
}
