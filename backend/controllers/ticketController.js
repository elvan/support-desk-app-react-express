const asyncHandler = require('express-async-handler');

const Ticket = require('../models/ticket');

exports.listTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find();

  if (tickets.length === 0) {
    res.status(404);
    throw new Error('No tickets found');
  }

  res.json({
    message: 'Tickets fetched successfully',
    ticketCount: tickets.length,
    tickets: tickets,
  });
});

exports.createTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.create(req.body);

  res.json({
    message: 'Ticket created successfully',
    ticket: ticket,
  });
});
