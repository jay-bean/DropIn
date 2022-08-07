'use strict';
module.exports = (sequelize, DataTypes) => {
  const Skatepark = sequelize.define('Skatepark', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 500]
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 100]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    long: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Skatepark.associate = function(models) {
    // associations can be defined here
    Skatepark.belongsTo(models.User, { foreignKey: 'userId' });
    Skatepark.hasMany(models.Image, { as: 'images', foreignKey: 'skateparkId', onDelete: 'CASCADE', hooks: true });
    Skatepark.hasMany(models.Review, { foreignKey: 'skateparkId', onDelete: 'CASCADE', hooks: true  });
    Skatepark.hasMany(models.Parktag, { foreignKey: 'skateparkId', onDelete: 'CASCADE', hooks: true });
    Skatepark.hasMany(models.Favorite, { foreignKey: 'skateparkId', onDelete: 'CASCADE', hooks: true });
    Skatepark.belongsToMany(models.User, {
      through: 'Favorite',
      foreignKey: 'skateparkId',
      otherKey: 'userId',
    });
    Skatepark.belongsToMany(models.Tag, {
      through: 'Parktag',
      foreignKey: 'skateparkId',
      otherKey: 'tagId',
    });
  };
  return Skatepark;
};
