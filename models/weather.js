'use strict';
module.exports = (sequelize, DataTypes) => {
  const Weather = sequelize.define('Weather', {
    time: DataTypes.INTEGER,
    icon: DataTypes.STRING,
    precipIntensity: DataTypes.FLOAT,
    precipPercent: DataTypes.FLOAT,
    temperature: DataTypes.FLOAT,
    humidity: DataTypes.FLOAT,
    windSpeed: DataTypes.FLOAT,
    windGust: DataTypes.FLOAT,
    windBearing: DataTypes.FLOAT,
    cloudCover: DataTypes.FLOAT,
    visibility: DataTypes.FLOAT,
    precipIntensityMax: DataTypes.FLOAT,
    precipIntensityMaxTime: DataTypes.INTEGER,
    temperatureLow: DataTypes.FLOAT,
    temperatureHigh: DataTypes.FLOAT
  }, {});
  Weather.associate = function(models) {
    // associations can be defined here
  };
  return Weather;
};