import express from 'express'
import {
  deleteTicket,
  editTicket,
  getTicket,
  getTickets,
  postTickets,
} from '../controllers/ticket.js'

const router = express.Router()

router.post('/', postTickets)
router.get('/', getTickets)
router.get('/:id', getTicket)
router.put('/:id', editTicket)
router.delete('/:id', deleteTicket)

export default router
