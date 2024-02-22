const { Account } = require('models');

const getAccounts = accountBody => {
  return Account.findAll(accountBody);
};

module.exports = {
  getAccounts,
};
