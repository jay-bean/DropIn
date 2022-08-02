'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    skateparkId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Favorite.associate = function(models) {
    // associations can be defined here
    Favorite.belongsTo(models.User, {foreignKey: 'userId'})
    Favorite.belongsTo(models.Skatepark, {foreignKey: 'skateparkId'})
  };
  return Favorite;
};
