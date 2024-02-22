const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const { Token2 } = require('../models');
const { tokenTypes } = require('../config/tokens');

const revokeToken = async tokenBody => {
  const token = await Token2.findOne({ where: tokenBody });
  if (!token) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await token.destroy();
};

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await Token2.create({
    token,
    userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const generateAuthTokens = async user => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);
  await saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

module.exports = {
  saveToken,
  generateToken,
  generateAuthTokens,
  revokeToken,
};
