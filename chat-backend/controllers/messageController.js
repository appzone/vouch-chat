const messageService = require('../services/messageService');

// Handle saving a new message
const getMessages = async (data) => {
  try {
    const messages = await messageService.getAllMessages(data);
    return messages;
  } catch (error) {
    console.error('Error get messages:', error);
  }
};

const saveMessage = async (data) => {
  try {
    const message = await messageService.saveMessage(data);
    return message;
  } catch (error) {
    console.error('Error save messages:', error);
  }
};


module.exports = { getMessages, saveMessage };
