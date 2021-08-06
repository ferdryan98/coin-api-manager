'use strict';
const { Model } = require('sequelize');
require('dotenv').config();

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Bots, { 
        as: 'bots',
        foreignKey: 'accountId',
      });
    }
  }
  Account.init(
    {
      accountId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      mode: {
        type: DataTypes.STRING,
        defaultValue: process.env.ACCOUNT_MODE,
      },
      createdAt:DataTypes.DATE,
      updatedAt:DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Accounts',
      tableName: 'accounts',
    }
  );
  return Account;
};
