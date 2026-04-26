import express from 'express'
import * as menuController from '../controllers/menuControllers.js'
const router = express.Router()
router.get('/', menuController.getFullMenu)
router.get('/food', menuController.getFood)
router.get('/drinks', menuController.getDrinks)
export default router
