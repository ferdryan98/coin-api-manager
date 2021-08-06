'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Accounts, {
        as: 'account',
        foreignKey: 'accountId',
      });
    }
  }
  Bot.init(
    {
      botId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      accountId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      pair: DataTypes.STRING,
      strategy: DataTypes.STRING,
      isEnabled: DataTypes.BOOLEAN,
      mode: DataTypes.STRING,
      message: DataTypes.STRING,
      createdAt:DataTypes.DATE,
      updatedAt:DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Bots',
      tableName: 'bots',
    },
  );
  return Bot;
};
