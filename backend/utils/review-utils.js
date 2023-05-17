const { User, Spot, SpotImage, Review, ReviewImage } = require("../db/models");












const reviewFormater = async (review) => {
    let currentReview = review.toJSON();
    let spot = await Spot.findByPk(currentReview.spotId, {
        attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"]
    })

    let currentSpot = spot.toJSON();

    let prevImage = await SpotImage.findOne({
        where: {
            spotId: currentSpot.id
        }
    })

    if (prevImage) {
        currentSpot.previewImage = prevImage.url
    } else {
        currentSpot.previewImage = "No preview Image"
    }

    let reviewImages = await ReviewImage.findAll({
        where: {
            reviewId: currentReview.id
        },
        attributes: ["id", "url"]
    })

    return { ...currentReview, Spot: currentSpot, ReviewImages: reviewImages };
}

const reviewFormaterNoSpot = async (review) => {
    let currentReview = review.toJSON();

    let reviewImages = await ReviewImage.findAll({
        where: {
            reviewId: currentReview.id
        },
        attributes: ["id", "url"]
    })


    return { ...currentReview, ReviewImages: reviewImages };
}

















module.exports = { reviewFormater, reviewFormaterNoSpot }
