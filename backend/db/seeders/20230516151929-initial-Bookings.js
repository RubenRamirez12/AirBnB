'use strict';

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

options.tableName = "Bookings";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(options.tableName, [
      {
        spotId: 3,
        userId: 5,
        startDate: '2023-01-01',
        endDate: '2023-01-6',
      },
      {
        spotId: 1,
        userId: 4,
        startDate: '2023-04-15',
        endDate: '2023-05-01',
      },
      {
        spotId: 5,
        userId: 1,
        startDate: "2023-06-15",
        endDate: "2023-07-11",
      }
    ])
  },

  async down(queryInterface, Sequelize) {

    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options.tableName, {
      [Sequelize.Op.or]: [
        { starDate: '2023-01-01', endDate: '2023-01-6' },
        { starDate: '2023-04-15', endDate: '2023-05-01' },
        { starDate: '2023-06-15', endDate: '2023-07-11' }
      ]
    });
  }
}
