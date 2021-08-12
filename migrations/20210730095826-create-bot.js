'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bots', {
      bot_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      account_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      base_order_volume: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      take_profit: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      safety_order_volume: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      martingale_volume_coefficient: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      martingale_step_coefficient: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      max_safety_orders: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      active_safety_orders_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      safety_order_step_percentage: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      take_profit_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      strategy_list: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      stop_loss_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      stop_loss_percentage: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      strategy: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      leverage_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      leverage_custom_value: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      start_order_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      trailing_enabled:  {
        type: Sequelize.BOOLEAN,
        allowNull : false,
      },
      trailing_deviation: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      is_enabled: {
        type: Sequelize.BOOLEAN,
        allowNull : false,
      },
      pairs: {
        type: Sequelize.STRING,
      },
      strategy: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mode: {
        type: Sequelize.STRING,
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('bots');
  },
};
