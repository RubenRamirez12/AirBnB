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

    return queryInterface.bulkInsert(options, [
      {
        username: 'Username1',
        email: 'User1@gmail.com',
        hashedPassword: bcrypt.hashSync('password1'),
        firstName: 'User',
        lastName: "One"
      },
      {
        username: 'Username2',
        email: 'User2@gmail.com',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: "User",
        lastName: "Two"
      },
      {
        username: 'Username3',
        email: 'User3@gmail.com',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'User',
        lastName: "Three"
      },
      {
        username: 'Username4',
        email: 'User4@gmail.com',
        hashedPassword: bcrypt.hashSync('password4'),
        firstName: 'User',
        lastName: "Four"
      },
      {
        username: 'Username5',
        email: 'User5@gmail.com',
        hashedPassword: bcrypt.hashSync('password5'),
        firstName: 'User',
        lastName: "Five"
      },
      {
        username: 'Demo1',
        email: 'Demo1@user.io',
        hashedPassword: bcrypt.hashSync('Demo123'),
        firstName: 'Demo1',
        lastName: "User"
      },
      {
        username: 'Demo2',
        email: 'Demo2@user.io',
        hashedPassword: bcrypt.hashSync('Demo123'),
        firstName: 'Demo2',
        lastName: "User"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {

    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Username1', 'Username2', 'Username3', 'Username4', "Username5", 'Demo1', "Demo2"] }
    }, {});
  }
};
