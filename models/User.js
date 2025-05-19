const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: { type: String, enum: ['Employee', 'Agent', 'Admin'], default: 'Employee' },
  password: String
});

module.exports = mongoose.model('User', userSchema);
