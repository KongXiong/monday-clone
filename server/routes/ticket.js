import express from 'express'
import {
  deleteTicket,
  getTicket,
  getTickets,
  postTickets,
} from '../controllers/ticket.js'

const router = express.Router()

router.post('/', postTickets)
router.get('/', getTickets)
router.get('/', getTicket)
router.delete('/:id', deleteTicket)

export default router
