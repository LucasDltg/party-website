// lib/db.ts
import mariadb from 'mariadb'

export const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Website',
  database: 'LucasWebsite',
  connectionLimit: 5,
})
