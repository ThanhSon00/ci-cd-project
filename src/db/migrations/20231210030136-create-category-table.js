const { QueryInterface, Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(db) {
    if (db instanceof QueryInterface) {
      return db.sequelize.transaction(t => {
        return Promise.all([
          db.createTable(
            'Categories',
            {
              id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true,
              },
              name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
              },
              createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
              updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
              deletedAt: { type: DataTypes.DATE },
            },
            { transaction: t }
          ),

          db.createTable(
            'Categories_Questions',
            {
              questionId: {
                type: DataTypes.INTEGER,
                references: {
                  model: 'Questions',
                  key: 'id',
                },
              },
              categoryId: {
                type: DataTypes.INTEGER,
                references: {
                  model: 'Categories',
                  key: 'id',
                },
              },
              createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
              updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
            },
            { transaction: t }
          ),
        ]);
      });
    }
  },

  async down(db) {
    if (db instanceof QueryInterface) {
      return db.sequelize.transaction(t => {
        return Promise.all([
          db.dropTable('Categories_Questions', { transaction: t }),
          db.dropTable('Categories', { transaction: t }),
        ]);
      });
    }
  },
};
