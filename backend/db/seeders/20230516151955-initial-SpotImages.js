'use strict';

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

options.tableName = "SpotImages";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "spotUrl1",
        preview: false
      },
      {
        spotId: 1,
        url: 'Spot1Url',
        preview: false
      },
      {
        spotId: 3,
        url: "SpotUrl3",
        preview: true
      },
      {
        spotId: 4,
        url: "Spot4Url",
        preview: false
      },
      {
        spotId: 1,
        url: "spotUrl1again",
        preview: false
      },
      {
        spotId: 1,
        url: "spotUrl1again",
        preview: false
      },
    ])
  },

  async down (queryInterface, Sequelize) {

    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options, {
      [Sequelize.Op.or]: [
        {
          spotId: 1,
          url: "spotUrl1",
          preview: false
        },
        {
          spotId: 1,
          url: 'Spot1Url',
          preview: false
        },
        {
          spotId: 3,
          url: "SpotUrl3",
          preview: true
        },
        {
          spotId: 4,
          url: "Spot4Url",
          preview: false
        }
      ]
    })
  }
};
