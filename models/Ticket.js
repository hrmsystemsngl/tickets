const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: 'Open' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
  category: String,
  isGrievance: { type: Boolean, default: false },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);
