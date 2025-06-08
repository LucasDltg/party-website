// scripts/setAdminClaim.js

/* eslint-disable*/
require('dotenv').config()
const admin = require('firebase-admin')
/* eslint-enable*/

const UID = 'OzV3lbphDPXatnEplLpIH38BNij2'

// Parse JSON string from env
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!)

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

async function setAdminClaim() {
  try {
    await admin.auth().setCustomUserClaims(UID, { role: 'admin' })
    // await admin.auth().setCustomUserClaims(UID, {});
    console.log(`✅ Set 'admin' role for user ${UID}`)
  } catch (err) {
    console.error('❌ Failed to set role:', err)
  }
}

setAdminClaim()
