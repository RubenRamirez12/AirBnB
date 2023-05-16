'use strict';

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

options.tableName = "ReviewImages";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: "ReviewImageOne"
      },
      {
        reviewId: 2,
        url: "ReviewImageTwo"
      },
      {
        reviewId: 3,
        url: "ReviewImageThree"
      }
    ])
  },

  async down (queryInterface, Sequelize) {

    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options, {
      [Sequelize.Op.or]: [
        {
          reviewId: 1,
          url: "ReviewImageOne"
        },
        {
          reviewId: 2,
          url: "ReviewImageTwo"
        },
        {
          reviewId: 3,
          url: "ReviewImageThree"
        }
      ]
    })
  }
};
