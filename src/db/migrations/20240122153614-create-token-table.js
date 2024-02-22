const { QueryInterface, DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
const { tokenTypes } = require('../../config/tokens');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(db) {
    if (db instanceof QueryInterface) {
      return db.createTable('Tokens', {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          autoIncrement: true,
        },
        token: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM,
          values: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
          allowNull: false,
        },
        expires: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        blacklisted: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Users',
            key: 'id',
          },
          allowNull: false,
        },
        createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
        updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
      });
    }
  },

  async down(db) {
    if (db instanceof QueryInterface) {
      return db.dropTable('Tokens');
    }
  },
};
