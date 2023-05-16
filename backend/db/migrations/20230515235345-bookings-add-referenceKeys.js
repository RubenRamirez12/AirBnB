'use strict';

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

options.tableName = "Bookings";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn(options, "spotId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Spots'
      },
      onDelete: 'CASCADE'
    });


    await queryInterface.addColumn(options, "userId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users'
      },
      onDelete: 'CASCADE'
    })


  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeColumn(options.tableName, 'spotId')

    await queryInterface.removeColumn(options.tableName, 'userId')

  }
};
