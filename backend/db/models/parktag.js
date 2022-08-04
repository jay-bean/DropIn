'use strict';
module.exports = (sequelize, DataTypes) => {
  const Parktag = sequelize.define('Parktag', {
    skateparkId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Parktag.associate = function(models) {
    // associations can be defined here
    Parktag.belongsTo(models.Tag, {foreignKey: 'tagId'})
    Parktag.belongsTo(models.Skatepark, {foreignKey: 'skateparkId'})
  };
  return Parktag;
};
