const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: {
    type: String,
    enum: ['Employee', 'Agent', 'Manager', 'Admin'],
    default: 'Employee'
  },
  password: String,
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // NEW
});

module.exports = mongoose.model('User', userSchema);
