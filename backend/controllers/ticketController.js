const asyncHandler = require('express-async-handler');

const Ticket = require('../models/ticket');
const User = require('../models/user');

exports.listTickets = asyncHandler(async (req, res) => {
  // @ts-ignore
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  const tickets = await Ticket.find({
    user: user._id,
  });

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
  // @ts-ignore
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error('Missing required fields');
  }

  const ticketData = {
    product,
    description,
    user: user._id,
  };

  const ticket = await Ticket.create(ticketData);

  if (!ticket) {
    res.status(500);
    throw new Error('Error creating ticket');
  }

  res.json({
    message: 'Ticket created successfully',
    ticket: ticket,
  });
});
