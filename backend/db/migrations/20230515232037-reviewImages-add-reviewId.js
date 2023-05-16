'use strict';

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

options.tableName = "ReviewImages";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn(options.tableName, "reviewId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Reviews"
      },
      onDelete: "CASCADE"
    })
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeColumn(options.tableName, 'reviewId')

  }
};
