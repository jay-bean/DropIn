'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 100]
      }
    },
  }, {});
  Tag.associate = function(models) {
    // associations can be defined here
    Tag.belongsToMany(models.Skatepark, {
      through: 'Parktag',
      foreignKey: 'tagId',
      otherKey: 'skateparkId'
    });
  };
  return Tag;
};
