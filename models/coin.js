'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Coin.init(
    {
      coinBase: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      createdAt:DataTypes.DATE,
      updatedAt:DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Coins',
      tableName: 'coins',
    }
  );
  return Coin;
};
