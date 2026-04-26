import express from 'express'
import * as eventsController from '../controllers/eventsControllers.js'
const router = express.Router()
router.get('/', eventsController.getAllEvents)
router.get('/:id', eventsController.getEventById)
export default router
