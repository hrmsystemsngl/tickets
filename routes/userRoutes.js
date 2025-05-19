const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find().populate('manager');
  res.json(users);
});

// Update user role or manager
router.put('/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    role: req.body.role,
    manager: req.body.managerId
  }, { new: true });
  res.json(user);
});

module.exports = router;
