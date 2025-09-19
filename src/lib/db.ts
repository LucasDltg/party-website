// lib/db.ts
import mariadb from 'mariadb'

export const pool = mariadb.createPool({
  host: 'localhost',
  user: 'website',
  password: 'strong_password',
  database: 'LucasWebsite',
  connectionLimit: 5,
})
