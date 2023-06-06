'use strict';

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

options.tableName = "Spots";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.bulkInsert(options, [
      {
        ownerId: 6,
        address: "123 cool street",
        city: "Coolcentro",
        state: "California",
        country: "United States",
        lat: 11.1111,
        lng: 22.2222,
        name: "Cool House",
        description: "Built in the 19th century, with a 360 degrees view over the sea and surroundings on the top floor.It features a Bedroom with a king size bed, a very well- decorated living room with kitchenette, and a WC.Free WiFi, air conditioning, Led TV and DVD player.Private parking inside the premises, providing extra security.Perfect for an unforgettable honeymoon experience.The spaceIt has a 4000 m garden with sub - tropical fruit trees, garden trees, and flowers.In addition to the Mill ideal for 2 people, it has two more accommodation units: the Mó de Cimas House ideal up to 3 people and the Moleiros House that hold up tp 4 people.Guest accessGuests have access to all property spaces.License numberExempt",
        price: 100.10
      },
      {
        ownerId: 6,
        address: "Location at place",
        city: "LocationalCentral",
        state: "California",
        country: "United States",
        lat: -123.232,
        lng: 44.2322,
        name: "Cooler than the Cool House",
        description: "Enjoy a nicer stay at this even better house",
        price: 200.20
      },
      {
        ownerId: 6,
        address: "123 tropical road",
        city: "Tropicality",
        state: "Florida",
        country: "United States",
        lat: 33.3333,
        lng: 44.4444,
        name: "Tropical House",
        description: "Enjoy the tropical relaxation of this house",
        price: 300.37
      },
      {
        ownerId: 7,
        address: "123 forest avenue",
        city: "Forest Lake",
        state: "Ohio",
        country: "United States",
        lat: 55.5555,
        lng: 66.6666,
        name: "Forest House",
        description: "Experience nature in this incredible forest house",
        price: 400.47
      },
      {
        ownerId: 7,
        address: "123 midcity lane",
        city: "New York",
        state: "New York",
        country: "United States",
        lat: 77.7777,
        lng: 88.8888,
        name: "City House",
        description: "Experience the incredible views that this house in new york provides",
        price: 500.50
      },
      {
        ownerId: 7,
        address: "123 camino snow",
        city: "Snowville",
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

  async down(queryInterface, Sequelize) {

    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Cool House', 'Cooler than the Cool House', 'Tropical House', 'Forest House', "City House", 'Snow House'] }
    }, {});

  }
};
