const { QueryInterface, DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
const { sequelize } = require('../../config/config');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(db) {
    const t = await sequelize.connection.transaction();
    if (db instanceof QueryInterface) {
      await db.dropTable('Accounts', { transaction: t });

      await db.removeColumn('Members', 'accountId', { transaction: t });

      await db.renameTable('Members', 'Users', { transaction: t });
    }
  },

  async down(db) {
    const t = await sequelize.connection.transaction();
    if (db instanceof QueryInterface) {
      await db.renameTable('Users', 'Members', { transaction: t });

      await db.addColumn(
        'Members',
        'accountId',
        {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        { transaction: t }
      );

      await db.createTable(
        'Accounts',
        {
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
        },
        { transaction: t }
      );
    }
  },
};
