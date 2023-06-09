'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Booking.belongsTo(models.User, { foreignKey: "userId" });

      Booking.belongsTo(models.Spot, { foreignKey: "spotId" });

    }
  }
  Booking.init({
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        validStartDate(value) {
          if (value > this.endDate) {
            throw new Error ("Please pick a date BEFORE the end date")
          }
        }
      }
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        validEndDate(value) {
          if (value < this.startDate) {
            throw new Error ("Please pick a date AFTER the start date")
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
