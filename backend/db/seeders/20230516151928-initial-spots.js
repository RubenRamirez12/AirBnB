'use strict';

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

options.tableName = "Spots";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "123 cool street",
        city: "Cool City",
        state: "California",
        country: "United States",
        lat: 11.1111,
        lng: 22.2222,
        name: "Cool House",
        description: "Enjoy a stay at this very nice house",
        price: 100.10
      },
      {
        ownerId: 1,
        address: "123 cooler street",
        city: "Cooler City",
        state: "California",
        country: "United States",
        lat: 11.1112,
        lng: 22.2221,
        name: "Cooler than the Cool House",
        description: "Enjoy a nicer stay at this even better house",
        price: 200.20
      },
      {
        ownerId: 2,
        address: "123 tropical road",
        city: "Tropical City",
        state: "Florida",
        country: "United States",
        lat: 33.3333,
        lng: 44.4444,
        name: "Tropical House",
        description: "Enjoy the tropical relaxation of this house",
        price: 300.30
      },
      {
        ownerId: 3,
        address: "123 forest avenue",
        city: "Forest City",
        state: "Ohio",
        country: "United States",
        lat: 55.5555,
        lng: 66.6666,
        name: "Forest House",
        description: "Experience nature in this incredible forest house",
        price: 400.40
      },
      {
        ownerId: 4,
        address: "123 midcity lane",
        city: "City City",
        state: "New York",
        country: "United States",
        lat: 77.7777,
        lng: 88.8888,
        name: "City House",
        description: "Experience the incredible views that this house in new york provides",
        price: 500.50
      },
      {
        ownerId: 5,
        address: "123 camino snow",
        city: "Snowy City",
        state: "Minnesota",
        country: "United States",
        lat: 99.9999,
        lng: 10.1010,
        name: "Snow House",
        description: "Snowboarding and skating is all we do in this snow house",
        price: 600.60
      }
    ])
  },

  async down (queryInterface, Sequelize) {

    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Cool House', 'Cooler than the Cool House', 'Tropical House', 'Forest House', "City House", 'Snow House'] }
    }, {});

  }
};
