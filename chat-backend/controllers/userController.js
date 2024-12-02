const userService = require('../services/userService');

// Handle saving a new message
const saveUser = async (data) => {
  try {
    const savedMessage = await userService.saveUser(data);
    return savedMessage;
  } catch (error) {
    console.error('Error saving user:', error);
  }
};


module.exports = { saveUser };
