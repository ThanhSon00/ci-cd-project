const config = require('../../src/config/config');

const clearAllData = async () => {
  await config.sequelize.connection.query('SET FOREIGN_KEY_CHECKS = 0;');
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  await config.sequelize.connection.truncate({ force: true, cascade: true });

  await config.sequelize.connection.query('SET FOREIGN_KEY_CHECKS = 1;');
};

const setupTestDB = () => {
  beforeEach(async () => {
    await clearAllData();
  });
};

module.exports = setupTestDB;
