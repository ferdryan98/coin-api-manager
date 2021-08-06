'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bots', {
      botId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      accountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isEnabled: {
        type: Sequelize.BOOLEAN,
        allowNull : false,
      },
      pair: {
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('bots');
  },
};