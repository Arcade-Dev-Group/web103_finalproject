import express from 'express'
import cors from 'cors'

import './config/dotenv.js'

import menuRoutes from './routes/menuRoutes.js'
import gamesRoutes from './routes/gamesRoutes.js'
import eventRoutes from './routes/eventRoutes.js'


const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/menu', menuRoutes)
app.use('/api/games', gamesRoutes)
app.use('/api/events', eventRoutes)

app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">Arcade Bar API</h1>')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})