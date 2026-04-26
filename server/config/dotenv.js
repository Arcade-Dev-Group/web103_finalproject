import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Loads server/.env regardless of where node is launched from
dotenv.config({ path: path.resolve(__dirname, '..', '.env') })