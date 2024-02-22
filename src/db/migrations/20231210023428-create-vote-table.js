const { QueryInterface, Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(db) {
    if (db instanceof QueryInterface) {
      return db.createTable(
        'Votes',
        {
          id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
          },
          voteType: {
            type: DataTypes.ENUM,
            values: ['UP', 'DOWN'],
            allowNull: false,
          },
          commentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'Comments',
              key: 'id',
            },
            defaultValue: 1,
          },
          questionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'Questions',
              key: 'id',
            },
            defaultValue: 1,
          },
          memberId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'Members',
              key: 'id',
            },
            defaultValue: 1,
          },
          createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
          updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
        },
        {
          uniqueKeys: {
            unique_index: {
              fields: ['commentId', 'questionId', 'memberId'],
            },
          },
        }
      );
    }
  },

  async down(db) {
    if (db instanceof QueryInterface) {
      return db.dropTable('Votes');
    }
  },
};
