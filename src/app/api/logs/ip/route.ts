import { pool } from '@/lib/db'
import { NextResponse } from 'next/server'
import { withAPIProtected } from '@/lib/firebase/withAPIProtected'

export const GET = withAPIProtected(
  async () => {
    try {
      const rows: {
        ip_text: string
        country_name: string
        region_name: string
        city_name: string
        isp: string
        created_at: string
      }[] = await pool.query(
        `SELECT ip_text, country_name, region_name, city_name, isp, created_at
        FROM ip_api_logs
        ORDER BY created_at DESC
        LIMIT 50`,
      )

      return NextResponse.json(rows)
    } catch (err) {
      console.error('Failed to fetch logs:', err)
      return NextResponse.json(
        { error: 'Failed to fetch logs' },
        { status: 500 },
      )
    }
  },
  { requiredRole: 'admin' },
)
