'use strict';

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

options.tableName = "Users";

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface, Sequelize) {

    await queryInterface.addIndex(options, ['username'], {
      name: "uq_users_username"
    });

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeIndex(options, 'uq_users_username');

  }
};
