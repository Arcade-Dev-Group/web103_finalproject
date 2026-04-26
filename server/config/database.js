import './dotenv.js'
import pg from 'pg'

const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT ? Number(process.env.PGPORT) : undefined,
    ssl: {
        rejectUnauthorized: false
    }
}

export const pool = new pg.Pool(config)