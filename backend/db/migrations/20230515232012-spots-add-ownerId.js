'use strict';

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

options.tableName = "Spots";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn(options.tableName, "ownerId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
      },
      onDelete: 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeColumn(options.tableName, "ownerId");

  }
};
