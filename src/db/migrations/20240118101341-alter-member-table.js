const { QueryInterface, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/config');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(db) {
    const t = await sequelize.connection.transaction();

    if (db instanceof QueryInterface) {
      await db.removeConstraint('Members', 'members_ibfk_1', { transaction: t });

      // Add email column
      await db.addColumn(
        'Members',
        'email',
        {
          type: DataTypes.STRING,
          unique: true,
        },
        { transaction: t }
      );

      // Add password column
      await db.addColumn(
        'Members',
        'password',
        {
          type: DataTypes.STRING,
        },
        { transaction: t }
      );
    }
  },

  async down(db) {
    const t = await sequelize.connection.transaction();

    if (db instanceof QueryInterface) {
      await db.removeColumn('Members', 'password', { transaction: t });

      await db.removeColumn('Members', 'email', { transaction: t });

      await db.addConstraint('Members', {
        fields: ['accountId'],
        name: 'members_ibfk_1',
        type: 'foreign key',
        references: {
          table: 'Accounts',
          field: 'id',
        },
        onDelete: null,
        onUpdate: null,
        transaction: t,
      });
    }
  },
};
