const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: 'String',
      required: [true, 'Please add a product'],
      enum: ['Books', 'Movies', 'Music', 'Games', 'Electronics', 'Computers'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    status: {
      type: String,
      required: true,
      enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
      default: 'Open',
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
