const User = require('../models/user');

const saveUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const getUserByUsername = async (username) => {
  return await User.find({ username });
};

module.exports = { saveUser, getUserByUsername };
