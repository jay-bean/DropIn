'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 500]
      }
    },
    skateparkId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
    Image.belongsTo(models.Skatepark, { foreignKey: 'skateparkId' });
  };
  return Image;
};
