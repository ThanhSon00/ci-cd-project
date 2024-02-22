const { DataTypes, Model } = require('sequelize');
const config = require('../config/config');

class Member extends Model {}

Member.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '/non-avatar.jpg',
    },
    googleId: {
      type: DataTypes.STRING,
      unique: true,
    },
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Accounts',
        key: 'id',
      },
    },
  },
  { sequelize: config.sequelize, timestamps: true, paranoid: true, modelName: 'Member' }
);

module.exports = Member;
