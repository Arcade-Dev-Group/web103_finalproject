import { pool } from '../config/database.js'

// POST /api/scores
const createScore = async (req, res) => {
  try {
    const { player_name, game_name, game_id, score } = req.body

    if (!player_name || score === undefined || (!game_name && game_id === undefined)) {
      return res.status(400).json({ error: 'player_name, score, and either game_name or game_id are required' })
    }

    const parsedScore = Number(score)
    if (!Number.isFinite(parsedScore) || parsedScore < 0) {
      return res.status(400).json({ error: 'score must be a non-negative number' })
    }

    let resolvedGameId = Number(game_id)
    if (!Number.isInteger(resolvedGameId) || resolvedGameId <= 0) {
      const lookup = await pool.query(
        `SELECT id
         FROM arcade_games
         WHERE LOWER(name) = LOWER($1)
         LIMIT 1`,
        [game_name || '']
      )

      if (lookup.rows.length === 0) {
        return res.status(404).json({ error: 'Game not found' })
      }

      resolvedGameId = lookup.rows[0].id
    }

    const result = await pool.query(
      `INSERT INTO game_scores (player_name, game_id, score)
       VALUES ($1, $2, $3)
       RETURNING id, player_name, game_id, score, created_at`,
      [player_name, resolvedGameId, Math.floor(parsedScore)]
    )

    return res.status(201).json(result.rows[0])
  } catch (err) {
    return res.status(500).json({ error: 'Error saving score' })
  }
}

// GET /api/scores - all scores
const getAllScores = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT gs.id, gs.player_name, g.name AS game_name, gs.score, gs.created_at
       FROM game_scores gs
       JOIN arcade_games g ON g.id = gs.game_id
       ORDER BY gs.score DESC, gs.created_at ASC
       LIMIT 100`,
    )

    return res.json(result.rows)
  } catch (err) {
    return res.status(500).json({ error: 'Error fetching leaderboard' })
  }
}

// GET /api/scores/game/:gameName
const getTopScoresByGame = async (req, res) => {
  try {
    const { gameName } = req.params

    const result = await pool.query(
      `SELECT gs.id, gs.player_name, g.name AS game_name, gs.score, gs.created_at
       FROM game_scores gs
       JOIN arcade_games g ON g.id = gs.game_id
       WHERE LOWER(g.name) = LOWER($1)
       ORDER BY gs.score DESC, gs.created_at ASC
       LIMIT 20`,
      [gameName]
    )

    return res.json(result.rows)
  } catch (err) {
    return res.status(500).json({ error: 'Error fetching leaderboard' })
  }
}

export { createScore, getAllScores, getTopScoresByGame }
