import { pool } from '../config/database.js'


// GET /api/events
const getAllEvents = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY event_date ASC')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Error fetching events' })
  }
}


// create a new event





const getEventById = async (req, res) => {
  try {
    const { id } = req.params
    const [eventQuery, gamesQuery] = await Promise.all([
      pool.query('SELECT * FROM events WHERE id = $1', [id]),
      pool.query(`
        SELECT g.* FROM arcade_games g 
        JOIN event_games eg ON g.id = eg.game_id 
        WHERE eg.event_id = $1`, [id])
    ])

    if (eventQuery.rows.length === 0) return res.status(404).json({ error: 'Event not found' })

    res.json({
      event: eventQuery.rows[0],
      games: gamesQuery.rows
    })
  } catch (err) {
    res.status(500).json({ error: 'Error fetching event details' })
  }
}


export { getAllEvents, getEventById }