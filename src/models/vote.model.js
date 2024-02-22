const { DataTypes, Model } = require('sequelize');
const config = require('../config/config');
// const { ne: notEqual } = Op;

class Vote extends Model {}

Vote.init(
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
  },
  { sequelize: config.sequelize, timestamps: false, modelName: 'Vote' }
);

module.exports = Vote;
