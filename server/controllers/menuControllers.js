import { pool } from '../config/database.js'

// GET /api/menu
const getFullMenu = async (req, res) => {
  try {
    // Run both queries at the same time using Promise.all
    const [foodRes, drinksRes] = await Promise.all([
      pool.query('SELECT * FROM food'),
      pool.query('SELECT * FROM drinks')
    ])

    res.json({
      food: foodRes.rows,
      drinks: drinksRes.rows
    })
  } catch (err) {
    console.error('getFullMenu error:', err)
    res.status(500).json({ error: 'Error fetching menu' })
  }
}

const getFood = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM food')
    res.json(result.rows)
  } catch (err) {
    console.error('getFood error:', err)
    res.status(500).json({ error: 'Error fetching food' })
  }
}

// GET /api/menu/drinks
const getDrinks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM drinks')
    res.json(result.rows)
  } catch (err) {
    console.error('getDrinks error:', err)
    res.status(500).json({ error: 'Error fetching drinks' })
  }
}

export { getFullMenu, getFood, getDrinks }
