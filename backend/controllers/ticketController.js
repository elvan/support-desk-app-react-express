const asyncHandler = require('express-async-handler');

const Ticket = require('../models/ticket');
const User = require('../models/user');

exports.listTickets = asyncHandler(async (req, res) => {
  // @ts-ignore
  const user = req.user;

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

exports.getTicket = asyncHandler(async (req, res) => {
  // @ts-ignore
  const user = req.user;

  if (!user) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error('You are not authorized to view this ticket');
  }

  res.json({
    message: 'Ticket fetched successfully',
    ticket: ticket,
  });
});

exports.createTicket = asyncHandler(async (req, res) => {
  // @ts-ignore
  const user = req.user;

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

exports.updateTicket = asyncHandler(async (req, res) => {
  // @ts-ignore
  const user = req.user;

  if (!user) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error('You are not authorized to update this ticket');
  }

  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error('Missing required fields');
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    {
      product,
      description,
    },
    {
      new: true,
    }
  );

  if (!updatedTicket) {
    res.status(500);
    throw new Error('Error updating ticket');
  }

  res.json({
    message: 'Ticket updated successfully',
    ticket: updatedTicket,
  });
});

exports.deleteTicket = asyncHandler(async (req, res) => {
  // @ts-ignore
  const user = req.user;

  if (!user) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error('You are not authorized to delete this ticket');
  }

  const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);

  if (!deletedTicket) {
    res.status(500);
    throw new Error('Error deleting ticket');
  }

  res.json({
    message: 'Ticket deleted successfully',
  });
});
