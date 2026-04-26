import express from 'express'
import * as gamesController from '../controllers/gamesControllers.js'
const router = express.Router()
router.get('/', gamesController.getAllGames)
router.get('/:id', gamesController.getGameById)
export default router
