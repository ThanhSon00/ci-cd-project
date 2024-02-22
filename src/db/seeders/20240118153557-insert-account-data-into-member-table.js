const { QueryInterface, Op } = require('sequelize');
const logger = require('../../config/logger');

const { ne: notEqual } = Op;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(db) {
    if (db instanceof QueryInterface) {
      const promises = [];
      const accounts = (await db.select(null, 'Accounts')).filter(account => account.id !== 1);

      for (let i = 0; i < accounts.length; i += 1) {
        promises.push(
          db.bulkUpdate(
            'Members',
            {
              email: accounts[i].email,
              password: accounts[i].password,
            },
            {
              accountId: accounts[i].id,
            }
          )
        );
      }
      try {
        await Promise.all(promises);
      } catch (e) {
        logger.info(e.name);
        logger.info(e.message);
      }
    }
  },

  async down(db) {
    if (db instanceof QueryInterface) {
      await db.bulkUpdate(
        'Members',
        {
          email: null,
          password: null,
        },
        { id: { [notEqual]: 0 } }
      );
    }
  },
};
