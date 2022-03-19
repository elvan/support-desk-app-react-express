const express = require('express');
const {
  listTickets,
  createTicket,
} = require('../controllers/ticketController');

const authGuard = require('../middleware/authGuard');

const router = express.Router();

router.get('/', authGuard, listTickets);

router.post('/', authGuard, createTicket);

module.exports = router;
