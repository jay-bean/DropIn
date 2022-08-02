'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Demo',
        lastName: 'Lition',
        email: 'demo@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', {
      firstName: 'Demo'
    }, {});
  }
};
