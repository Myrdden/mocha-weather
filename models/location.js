'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    location: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {});
  Location.associate = function(models) {
    Location.belongsTo(models.User, {foreignKey: 'UserId', as: 'user'});
  };
  return Location;
};
