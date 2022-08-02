'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    skateparkId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.User, { foreignKey: 'userId' });
    Review.belongsTo(models.Skatepark, { foreignKey: 'skateparkId' });
  };
  return Review;
};
