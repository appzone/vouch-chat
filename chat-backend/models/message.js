const mongoose = require('mongoose');

// Define a schema
const messageSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  username: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create a model
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;