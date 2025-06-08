// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import nookies from 'nookies'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body

  // Set httpOnly cookie
  nookies.set({ res }, 'token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60, // 1 hour
    path: '/',
  })

  res.status(200).json({ message: 'Logged in' })
}
