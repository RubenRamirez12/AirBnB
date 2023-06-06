'use strict';

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

options.tableName = "Reviews";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        review: "What a unique place! Close to airport and Ponta Delgada if you have a car, which would be recommended. Cute small town.",
        stars: 5
      },
      {
        spotId: 1,
        userId: 2,
        review: "The views are unbeatable, comfortable bed, and super special touches like the morning breakfast delivery. ",
        stars: 4
      },
      {
        spotId: 1,
        userId: 3,
        review: "Absolutely magical place! It looks like on all the photos: staying in a windmill with a 360 degrees view over the ocean in absolute serenity. .",
        stars: 5
      },
      {
        spotId: 2,
        userId: 1,
        review: "highly recommend for sure",
        stars: 5
      },
      {
        spotId: 2,
        userId: 2,
        review: "highly super seriously recommend",
        stars: 5
      }
    ])
  },

  async down(queryInterface, Sequelize) {

    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options, {
      [Sequelize.Op.or]: [
        {
          spotId: 1,
          userId: 1,
          review: "What a unique place! Close to airport and Ponta Delgada if you have a car, which would be recommended. Cute small town.",
          stars: 5
        },
        {
          spotId: 1,
          userId: 2,
          review: "The views are unbeatable, comfortable bed, and super special touches like the morning breakfast delivery. ",
          stars: 4
        },
        {
          spotId: 1,
          userId: 3,
          review: "Absolutely magical place! It looks like on all the photos: staying in a windmill with a 360 degrees view over the ocean in absolute serenity. .",
          stars: 5
        },
        {
          spotId: 2,
          userId: 1,
          review: "highly recommend for sure",
          stars: 5
        },
        {
          spotId: 2,
          userId: 2,
          review: "highly super seriously recommend",
          stars: 5
        }
      ]
    });

  }
};
