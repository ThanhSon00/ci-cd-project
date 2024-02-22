const { DataTypes, Op, Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const config = require('../config/config');

const { ne: notEqual } = Op;

class Account extends Model {
  static async isEmailTaken(email, excludeUserId) {
    const account = await this.findOne({ email, id: { [notEqual]: excludeUserId } });
    return !!account;
  }

  async isPasswordMatch(password) {
    const user = this;
    return bcrypt.compare(password, user.password);
  }
}

Account.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize: config.sequelize, timestamps: true, paranoid: true, modelName: 'Account' }
);

module.exports = Account;
