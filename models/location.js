'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    city: DataTypes.STRING,
    state: DataTypes.STRING
  }, {});
  Location.associate = function(models) {
    Location.belongsTo(models.User, {foreignKey: 'userID', as: 'user'});
  };
  return Location;
};