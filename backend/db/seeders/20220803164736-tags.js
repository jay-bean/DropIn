'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tags', [
      { type: 'Half pipe', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Bowl', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Pool', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Snake run', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Street', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Rails', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Ledges', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Pump Track', createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tags', null, {});
  }
};
