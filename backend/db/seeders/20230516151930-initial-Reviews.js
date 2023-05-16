'use strict';

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

options.tableName = "Reviews";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    return queryInterface.bulkInsert(options, [
      {
        spotId: 5,
        userId: 1,
        review: "Great Spot",
        stars: 5
      },
      {
        spotId: 1,
        userId: 3,
        review: "Incredible spot",
        stars: 4
      },
      {
        spotId: 2,
        userId: 4,
        review: "highly recommend",
        stars: 5
      }
    ])
  },

  async down (queryInterface, Sequelize) {

    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options, {
      [Sequelize.Op.or]: [
        {
          spotId: 5,
          userId: 1,
          review: "Great Spot",
          stars: 5
        },
        {
          spotId: 1,
          userId: 3,
          review: "Incredible spot",
          stars: 4
        },
        {
          spotId: 2,
          userId: 4,
          review: "highly recommend",
          stars: 5
        }
      ]
    });

  }
};
