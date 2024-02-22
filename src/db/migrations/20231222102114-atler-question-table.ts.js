const { QueryInterface } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(db) {
    if (db instanceof QueryInterface) {
      db.addIndex('Questions', ['title', 'content'], {
        type: 'FULLTEXT',
        name: 'FX_Questions_Title_Content',
      });
    }
  },

  async down(db) {
    if (db instanceof QueryInterface) {
      db.removeIndex('Questions', 'FX_Questions_Title_Content');
    }
  },
};
