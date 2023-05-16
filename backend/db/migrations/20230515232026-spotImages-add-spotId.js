'use strict';

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

options.tableName = "SpotImages";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn(options, "spotId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Spots",
      },
      onDelete: 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeColumn(options, 'spotId')

  }
};
