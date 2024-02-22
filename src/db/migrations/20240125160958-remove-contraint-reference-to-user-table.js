const { QueryInterface } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(db) {
    if (db instanceof QueryInterface) {
      await db.removeConstraint('Votes', 'votes_ibfk_3');
      await db.removeConstraint('Questions', 'questions_ibfk_1');
      await db.removeConstraint('Comments', 'comments_ibfk_1');
    }
  },

  async down(db) {
    if (db instanceof QueryInterface) {
      await db.addConstraint('Comments', {
        type: 'foreign key',
        references: {
          table: 'Users',
          field: 'id',
        },
        onDelete: null,
        onUpdate: null,
        name: 'comments_ibfk_1',
        fields: ['memberId'],
      });

      await db.addConstraint('Questions', {
        type: 'foreign key',
        references: {
          table: 'Users',
          field: 'id',
        },
        onDelete: null,
        onUpdate: null,
        name: 'questions_ibfk_1',
        fields: ['memberId'],
      });

      await db.addConstraint('Votes', {
        type: 'foreign key',
        references: {
          table: 'Users',
          field: 'id',
        },
        onDelete: null,
        onUpdate: null,
        name: 'votes_ibfk_3',
        fields: ['memberId'],
      });
    }
  },
};
