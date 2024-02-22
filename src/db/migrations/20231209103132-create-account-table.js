const { QueryInterface, Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(db) {
    if (db instanceof QueryInterface) {
      // eslint-disable-next-line no-unused-expressions
      await db.createTable('Accounts', {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          autoIncrement: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
        updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
        deletedAt: { type: DataTypes.DATE },
      });

      await db.insert(null, 'Accounts', {
        email: 'none',
        password: 'none',
      });
    }
  },

  async down(db) {
    if (db instanceof QueryInterface) {
      await db.dropTable('Accounts');
    }
  },
};
