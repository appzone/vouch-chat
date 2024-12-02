const mongoose = require('mongoose');

// Define a schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }
});

// Create a model
const User = mongoose.model('User', userSchema);

module.exports = User;