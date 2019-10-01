'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Weather', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      time: {
        type: Sequelize.INTEGER
      },
      icon: {
        type: Sequelize.STRING
      },
      precipIntensity: {
        type: Sequelize.FLOAT
      },
      precipPercent: {
        type: Sequelize.FLOAT
      },
      temperature: {
        type: Sequelize.FLOAT
      },
      humidity: {
        type: Sequelize.FLOAT
      },
      windSpeed: {
        type: Sequelize.FLOAT
      },
      windGust: {
        type: Sequelize.FLOAT
      },
      windBearing: {
        type: Sequelize.FLOAT
      },
      cloudCover: {
        type: Sequelize.FLOAT
      },
      visibility: {
        type: Sequelize.FLOAT
      },
      precipIntensityMax: {
        type: Sequelize.FLOAT
      },
      precipIntensityMaxTime: {
        type: Sequelize.INTEGER
      },
      temperatureLow: {
        type: Sequelize.FLOAT
      },
      temperatureHigh: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Weather');
  }
};