const Message = require('../models/message');

// Save a new message to the database
const saveMessage = async (messageData) => {
  const message = new Message(messageData);
  return await message.save();
};

// Retrieve all messages
const getAllMessages = async (data) => {
  return (await Message.find({ roomId: data.roomId }).sort({ createdAt: -1 }).limit(10)).reverse();
};

module.exports = { saveMessage, getAllMessages };
