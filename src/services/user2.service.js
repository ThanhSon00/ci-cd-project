const httpStatus = require('http-status');
const { User2 } = require('../models');
const ApiError = require('../utils/ApiError');
const { userRepository } = require('../repositories');

const getUserByEmail = async email => {
  const users = await userRepository.getList({ email });
  return users ? users[0] : null;
};

const createNewUser = async userBody => {
  if (await User2.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return userRepository.create(userBody);
};

module.exports = {
  createNewUser,
  getUserByEmail,
};
