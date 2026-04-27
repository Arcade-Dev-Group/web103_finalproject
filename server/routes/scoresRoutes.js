import express from 'express'
import * as scoresController from '../controllers/scoresControllers.js'

const router = express.Router()

router.post('/', scoresController.createScore)
router.get('/game/:gameName', scoresController.getTopScoresByGame)

export default router
