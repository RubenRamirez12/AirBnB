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
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-679599412015648651/original/d713d707-1848-4b2f-9637-f654369c778a.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-679599412015648651/original/d9544014-4c19-43f2-9ea0-68f5dd13d3c6.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-679599412015648651/original/93ad943a-c053-4fea-9b02-d55f16071521.png?im_w=720",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-679599412015648651/original/b6db98ce-7c9e-4b43-95b7-d8a261f79e22.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-679599412015648651/original/bc7ec67a-ecaf-4f98-bbc6-ea1d5c87c56a.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/45680811/f4987a12_original.jpg?im_w=1200",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/45681108/e81868fd_original.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/45681302/d012f51f_original.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/45681161/a84ae15a_original.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/45681370/907e6791_original.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/45681370/907e6791_original.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/45681108/e81868fd_original.jpg?im_w=720",
        preview: false
      }
    ])
  },

  async down (queryInterface, Sequelize) {

    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options, {
      [Sequelize.Op.or]: [
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-679599412015648651/original/d713d707-1848-4b2f-9637-f654369c778a.jpeg?im_w=1200",
          preview: false
        },
        {
          spotId: 2,
          url: 'https://a0.muscache.com/im/pictures/miso/Hosting-679599412015648651/original/d9544014-4c19-43f2-9ea0-68f5dd13d3c6.jpeg?im_w=720',
          preview: false
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-679599412015648651/original/93ad943a-c053-4fea-9b02-d55f16071521.png?im_w=720",
          preview: true
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-679599412015648651/original/b6db98ce-7c9e-4b43-95b7-d8a261f79e22.jpeg?im_w=720",
          preview: false
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-679599412015648651/original/bc7ec67a-ecaf-4f98-bbc6-ea1d5c87c56a.jpeg?im_w=720",
          preview: false
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/45680811/f4987a12_original.jpg?im_w=1200",
          preview: false
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/45681108/e81868fd_original.jpg?im_w=720",
          preview: false
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/45681302/d012f51f_original.jpg?im_w=720",
          preview: false
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/45681161/a84ae15a_original.jpg?im_w=720",
          preview: false
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/45681370/907e6791_original.jpg?im_w=720",
          preview: false
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/45681370/907e6791_original.jpg?im_w=720",
          preview: false
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/45681108/e81868fd_original.jpg?im_w=720",
          preview: false
        }
      ]
    })
  }
};
