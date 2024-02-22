const httpStatus = require('http-status');
// const tokenService = require('./token.service');
const token2Service = require('./token2.service');
const ApiError = require('../utils/ApiError');
const user2Service = require('./user2.service');
const { tokenTypes } = require('../config/tokens');
// const { tokenTypes } = require('../config/tokens');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await user2Service.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

const logout = async refreshToken => {
  await token2Service.revokeToken({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  });
};

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
};
