const { User, Spot, SpotImage, Review, ReviewImage } = require("../db/models");

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



module.exports = { bookingFormater }
