const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { auth2Service, token2Service, user2Service } = require('../services');

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await auth2Service.loginUserWithEmailAndPassword(email, password);
  const tokens = await token2Service.generateAuthTokens(user);
  return res.status(httpStatus.OK).send({ user, tokens });
});

const register = catchAsync(async (req, res) => {
  const user = await user2Service.createNewUser(req.body);
  const tokens = await token2Service.generateAuthTokens(user.dataValues);
  return res.status(httpStatus.CREATED).send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await auth2Service.logout(req.body.refreshToken);
  return res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  login,
  register,
  logout,
};
