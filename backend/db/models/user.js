'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
    picUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 500]
      }
    },

  },
  {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] }
      },
      loginUser: {
        attributes: {}
      }
    }
  });

  User.prototype.toSafeObject = function() { // remember, this cannot be an arrow function due to the 'this' scope
    const { id, firstName, lastName, email, picUrl } = this; // context will be the User instance
    return { id, firstName, lastName, email, picUrl };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
   };

  User.getCurrentUserById = async function (id) {
  return await User.scope('currentUser').findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const user = await User.scope('loginUser').findOne({
      where: {
        email: credential
      }
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ firstName, lastName, email, password, picUrl }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      firstName,
      lastName,
      email,
      hashedPassword,
      picUrl
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
