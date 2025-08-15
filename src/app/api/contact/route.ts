// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase/firebaseAdmin'

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const token = authHeader?.split('Bearer ')[1]

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    await adminAuth.verifyIdToken(token)

    const contactData = {
      location: process.env.APP_LOCATION ?? '',
      phone: process.env.APP_PHONE_NUMBER ?? '',
      email: process.env.APP_MAIL_ADDRESS ?? '',
    }
    return NextResponse.json(contactData)
  } catch (err) {
    console.error('Failed to verify token:', err)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
}
