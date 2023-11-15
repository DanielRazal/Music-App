const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Please provide a user name.'],
    minlength: [3, 'UserName must be at least 3 characters.'],
    maxlength: [50, 'UserName cannot exceed 50 characters.'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: [3, 'Password must be at least 3 characters.'],
    maxlength: [50, 'Password cannot exceed 50 characters.'],
    trim: true,
  },
});

module.exports = mongoose.model('User', userSchema);