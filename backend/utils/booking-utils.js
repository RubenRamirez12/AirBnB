const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require("../db/models");
const { Op } = require('sequelize');

const bookingFormater = async (booking) => {
    let currentBooking = booking.toJSON()

    let spot = await Spot.findOne({
        where: {
            id: currentBooking.spotId
        },
        attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"]
    })

    let currentSpot = spot.toJSON();

    const spotImage = await SpotImage.findOne({
        where: {
            spotId: currentSpot.id
        }
    })

    if (spotImage) {
        currentSpot.previewImage = spotImage.url
    } else {
        currentSpot.previewImage = "No preview Image"
    }


    return { ...currentBooking, Spot: currentSpot }
}

const isValidDate = async (spotId, startDate, endDate) => {
    let sDate = new Date(startDate)
    let eDate = new Date(endDate)
    let todayDate = new Date()

    if (sDate > eDate || sDate < todayDate || eDate < todayDate) {
        return false
    };
    const currentBookings = await Booking.findAll({
        where: {
            spotId: spotId,
            [Op.or]: [
                {
                    startDate: {
                        [Op.between]: [startDate, endDate]
                    },
                    endDate: {
                        [Op.between]: [startDate, endDate]
                    },
                },
            ],
        }
    })

    if (currentBookings.length < 1) {
        return true
    } else {
        return false
    }

}

const bookingFormaterOwner = async (booking) => {
    let currentBooking = booking.toJSON()

    const user = await User.findByPk(currentBooking.userId, {
        attributes: ["id", "firstName", "lastName"]
    })


    return { ...currentBooking, User: user }
}

module.exports = { bookingFormater, isValidDate, bookingFormaterOwner }
