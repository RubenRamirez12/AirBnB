const { User, Spot, SpotImage, Review } = require("../db/models");



const spotFormater = async (spot) => {
    let currentSpot = spot.toJSON()
    let ratings = 0;

    const reviews = await Review.findAll({
        where: {
            spotId: currentSpot.id
        }
    })

    reviews.forEach(element => {
        ratings += element.stars
    })

    let avgRating = 0

    if (ratings > 0) {
        avgRating = ratings / reviews.length
    } else {
        avgRating = 0
    }

    currentSpot.avgRating = avgRating

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
    return currentSpot;
}

module.exports = spotFormater
