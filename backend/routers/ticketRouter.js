const express = require('express');
const {
  listTickets,
  createTicket,
  getTicket,
  updateTicket,
  deleteTicket,
  closeTicket,
  reopenTicket,
} = require('../controllers/ticketController');

const authGuard = require('../middleware/authGuard');

const router = express.Router();

router.get('/', authGuard, listTickets);

router.get('/:id', authGuard, getTicket);

router.post('/', authGuard, createTicket);

router.put('/:id', authGuard, updateTicket);

router.delete('/:id', authGuard, deleteTicket);

router.put('/:id/close', authGuard, closeTicket);

router.put('/:id/reopen', authGuard, reopenTicket);

module.exports = router;
