const { DataTypes, Model } = require('sequelize');
const config = require('../config/config');

class Comment extends Model {}

Comment.init(
  {
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
  },
  { sequelize: config.sequelize, timestamps: true, paranoid: true, modelName: 'Comment' }
);

module.exports = Comment;
