import { pool } from '../config/database.js'

// GET /api/games
const getAllGames = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM arcade_games ORDER BY name ASC')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Error fetching games' })
  }
}

// GET /api/games/:id
const getGameById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM arcade_games WHERE id = $1', [id])
    if (result.rows.length === 0) return res.status(404).json({ error: 'Game not found' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Error fetching game' })
  }
}

export { getAllGames, getGameById }