import express from 'express'
const router = express.Router()
import {
  getEvents,
  getEventById,
  deleteEvent,
  createEvent,
  updateEvent,
  createEventReview,
  getTopEvents,
} from '../controllers/eventController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getEvents).post(protect, admin, createEvent)
router.route('/:id/reviews').post(protect, createEventReview)
router.get('/top', getTopEvents)
router
  .route('/:id')
  .get(getEventById)
  .delete(protect, admin, deleteEvent)
  .put(protect, admin, updateEvent)

export default router
