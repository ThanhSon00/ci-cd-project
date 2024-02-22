const { QueryInterface, Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(db) {
    if (db instanceof QueryInterface) {
      await db.createTable('Comments', {
        id: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          autoIncrement: true,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        voteCount: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        memberId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Members',
            key: 'id',
          },
        },
        questionId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Questions',
            key: 'id',
          },
        },
        commentId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Comments',
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
      return db.dropTable('Comments');
    }
  },
};
