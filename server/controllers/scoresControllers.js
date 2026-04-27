import { pool } from '../config/database.js'

// POST /api/scores
const createScore = async (req, res) => {
  try {
    const { player_name, game_name, score } = req.body

    if (!player_name || !game_name || score === undefined) {
      return res.status(400).json({ error: 'player_name, game_name, and score are required' })
    }

    const parsedScore = Number(score)
    if (!Number.isFinite(parsedScore) || parsedScore < 0) {
      return res.status(400).json({ error: 'score must be a non-negative number' })
    }

    const result = await pool.query(
      `INSERT INTO game_scores (player_name, game_name, score)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [player_name, game_name, Math.floor(parsedScore)]
    )

    return res.status(201).json(result.rows[0])
  } catch (err) {
    return res.status(500).json({ error: 'Error saving score' })
  }
}

// GET /api/scores/game/:gameName
const getTopScoresByGame = async (req, res) => {
  try {
    const { gameName } = req.params

    const result = await pool.query(
      `SELECT id, player_name, game_name, score, created_at
       FROM game_scores
       WHERE LOWER(game_name) = LOWER($1)
       ORDER BY score DESC, created_at ASC
       LIMIT 20`,
      [gameName]
    )

    return res.json(result.rows)
  } catch (err) {
    return res.status(500).json({ error: 'Error fetching leaderboard' })
  }
}

export { createScore, getTopScoresByGame }
