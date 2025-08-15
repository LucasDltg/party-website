// scripts/encodeBase64.js

/* eslint-disable*/
require('dotenv').config()
/* eslint-enable*/

const ENV_VAR_NAME = 'FIREBASE_SERVICE_ACCOUNT_KEY'

const jsonString = process.env[ENV_VAR_NAME]

if (!jsonString) {
  console.error(`❌ Environment variable ${ENV_VAR_NAME} not found`)
  process.exit(1)
}

const encoded = Buffer.from(jsonString).toString('base64')
console.log(encoded)
