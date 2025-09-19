// app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { withAPIProtected } from '@/lib/firebase/withAPIProtected'

export const GET = withAPIProtected(
  async () => {
    try {
      const contactData = {
        location: process.env.APP_LOCATION ?? '',
        phone: process.env.APP_PHONE_NUMBER ?? '',
        email: process.env.APP_MAIL_ADDRESS ?? '',
      }

      return NextResponse.json(contactData)
    } catch (err) {
      console.error('Failed to get contact data:', err)
      return NextResponse.json(
        { message: 'Internal server error' },
        { status: 500 },
      )
    }
  },
  { requiredRole: 'admin' },
)
