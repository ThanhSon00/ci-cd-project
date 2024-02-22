const { DataTypes, Model } = require('sequelize');
const config = require('../config/config');
// const { ne: notEqual } = Op;

class Question extends Model {}

Question.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
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
    viewCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    memberId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Members',
        key: 'id',
      },
    },
  },
  { config, timestamps: true, paranoid: true, modelName: 'Question' }
);

// Question.beforeFind((options) => {
//   if (options.where instanceof Object) {
//     const object = options.where;
//     options.where = [];
//     options.where.push(object);
//   }
//   options.where ||= [];
//   options.where.push({ id: { [notEqual]: 1 } });
// });

module.exports = Question;
