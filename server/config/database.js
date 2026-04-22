import pg from 'pg'

const config = {
    user: process.env.PGUSER,
    passsword: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    ssl: {
        rejectUnauthorized: false
    }
}

export const pool = new pg.Pool(config)