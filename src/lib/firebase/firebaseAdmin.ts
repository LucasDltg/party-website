import * as admin from 'firebase-admin'

const base64String = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64
if (!base64String) {
  console.error(
    'Environment variables:',
    Object.keys(process.env).filter((key) => key.includes('FIREBASE')),
  )
  throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 is not set')
}
const decoded = Buffer.from(base64String, 'base64').toString()
const serviceAccount = JSON.parse(decoded)

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

export const adminAuth = admin.auth()
