const express = require('express');
const Ticket = require('../models/Ticket');
const router = express.Router();

router.post('/', async (req, res) => {
  const ticket = new Ticket(req.body);
  await ticket.save();
  res.json(ticket);
});

router.get('/', async (req, res) => {
  const tickets = await Ticket.find().populate('assignedTo').populate('createdBy');
  res.json(tickets);
});

router.put('/:id/assign', async (req, res) => {
  const ticket = await Ticket.findByIdAndUpdate(req.params.id, {
    assignedTo: req.body.agent_id
  }, { new: true });
  res.json(ticket);
});

module.exports = router;
