'use strict';
const bcrypt = require("bcryptjs")

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

options.tableName = "Users";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    return queryInterface.bulkInsert(options.tableName, [
      {
        email: 'User1@gmail.com',
        username: 'Username1',
        hashedPassword: bcrypt.hashSync('password1'),
        firstName: 'User',
        lastName: "One"
      },
      {
        email: 'User2@gmail.com',
        username: 'Username2',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: "User",
        lastName: "Two"
      },
      {
        email: 'User3@gmail.com',
        username: 'Username3',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'User',
        lastName: "Three"
      },
      {
        email: 'User4@gmail.com',
        username: 'Username4',
        hashedPassword: bcrypt.hashSync('password4'),
        firstName: 'User',
        lastName: "Four"
      },
      {
        email: 'User5@gmail.com',
        username: 'Username5',
        hashedPassword: bcrypt.hashSync('password5'),
        firstName: 'User',
        lastName: "Five"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {

    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options.tableName, {
      username: { [Op.in]: ['Username1', 'Username2', 'Username3', 'Username4', "Username5"] }
    }, {});
  }
};
