const { User2 } = require('../models');

const create = userBody => {
  return User2.create(userBody);
};

const getList = filter => {
  return User2.findAll({ where: filter });
};

module.exports = {
  create,
  getList,
};
