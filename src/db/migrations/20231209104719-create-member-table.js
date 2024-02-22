const { QueryInterface, Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(db) {
    if (db instanceof QueryInterface) {
      await db.createTable('Members', {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        avatar: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: '/non-avatar.jpg',
        },
        googleId: {
          type: DataTypes.STRING,
          unique: true,
        },
        accountId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Accounts',
            key: 'id',
          },
        },
        createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
        updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
        deletedAt: { type: DataTypes.DATE },
      });
    }
  },

  async down(db) {
    if (db instanceof QueryInterface) {
      return db.dropTable('Members');
    }
  },
};
