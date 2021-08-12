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
        foreignKey: 'account_id',
      });
    }
  }
  Bot.init(
    {
      bot_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      account_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      pairs: DataTypes.STRING,
      base_order_volume: DataTypes.FLOAT,
      take_profit: DataTypes.FLOAT,
      safety_order_volume: DataTypes.FLOAT,
      martingale_volume_coefficient: DataTypes.FLOAT,
      martingale_step_coefficient: DataTypes.FLOAT,
      max_safety_orders: DataTypes.INTEGER,
      active_safety_orders_count: DataTypes.INTEGER,
      safety_order_step_percentage: DataTypes.FLOAT,
      take_profit_type: DataTypes.STRING,
      strategy_list: DataTypes.STRING,
      stop_loss_type: DataTypes.STRING,
      stop_loss_percentage: DataTypes.FLOAT,
      strategy: DataTypes.STRING,
      leverage_type: DataTypes.STRING,
      leverage_custom_value: DataTypes.FLOAT,
      start_order_type: DataTypes.STRING,
      trailing_enabled: DataTypes.BOOLEAN,
      trailing_deviation: DataTypes.FLOAT,
      is_enabled: DataTypes.BOOLEAN,
      mode: DataTypes.STRING,
      message: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Bots',
      tableName: 'bots',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  return Bot;
};
