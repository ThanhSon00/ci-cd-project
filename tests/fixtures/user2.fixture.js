const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const { User2 } = require('../../src/models');

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const userOne = {
  name: faker.person.fullName(),
  email: faker.internet.email().toLowerCase(),
  password,
};

const insertUsers = users => {
  return User2.bulkCreate(users.map(user => ({ ...user, password: hashedPassword })));
};

module.exports = {
  userOne,
  insertUsers,
};
