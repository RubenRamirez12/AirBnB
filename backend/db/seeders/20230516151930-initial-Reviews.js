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
        review: "What a unique place! Close to airport and Ponta Delgada if you have a car, which would be recommended. Cute small town. Gated property. Easy checkin with good instructions and local recommendations. The breakfast was delivered in the morning in a small basket and was more than enough- meat, cheese, breads, pastries, fruits, orange juice, milk etc. A lovely stay on a beautiful island!",
        stars: 5
      },
      {
        spotId: 1,
        userId: 2,
        review: "The views are unbeatable, comfortable bed, and super special touches like the morning breakfast delivery. Unfortunately had to give just 4 stars due to 100+ ants on the main level. We are very understanding of being in a rural area and bugs being inevitable, however, this amount of ants was concerning. We were finding ants in our belongings for days. Still a breathtaking Airbnb, just would have loved a heads up to not keep personal belongings on the main level.",
        stars: 4
      },
      {
        spotId: 1,
        userId: 3,
        review: "Absolutely magical place! It looks like on all the photos: staying in a windmill with a 360 degrees view over the ocean in absolute serenity. We loved this place and re-scheduled several activities we had booked to be able to enjoy our stay at the windmill as much as possible. The local breakfast coming in a basked was a superb surprise: eating it with that sea view in a beautiful surrounding. Moinho (and his staff) was responsive ever since we made the booking and very clear and helpful in all exchanges we have had. I passionately recommend this beautiful place which made our experience on the island unforgettable",
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
          review: "What a unique place! Close to airport and Ponta Delgada if you have a car, which would be recommended. Cute small town. Gated property. Easy checkin with good instructions and local recommendations. The breakfast was delivered in the morning in a small basket and was more than enough- meat, cheese, breads, pastries, fruits, orange juice, milk etc. A lovely stay on a beautiful island!",
          stars: 5
        },
        {
          spotId: 1,
          userId: 2,
          review: "The views are unbeatable, comfortable bed, and super special touches like the morning breakfast delivery. Unfortunately had to give just 4 stars due to 100+ ants on the main level. We are very understanding of being in a rural area and bugs being inevitable, however, this amount of ants was concerning. We were finding ants in our belongings for days. Still a breathtaking Airbnb, just would have loved a heads up to not keep personal belongings on the main level.",
          stars: 4
        },
        {
          spotId: 1,
          userId: 3,
          review: "Absolutely magical place! It looks like on all the photos: staying in a windmill with a 360 degrees view over the ocean in absolute serenity. We loved this place and re-scheduled several activities we had booked to be able to enjoy our stay at the windmill as much as possible. The local breakfast coming in a basked was a superb surprise: eating it with that sea view in a beautiful surrounding. Moinho (and his staff) was responsive ever since we made the booking and very clear and helpful in all exchanges we have had. I passionately recommend this beautiful place which made our experience on the island unforgettable",
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
