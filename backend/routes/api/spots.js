const express = require("express");
const router = express.Router();

const { Spot, SpotImage, Review } = require("../../db/models");



router.get('/', async (req, res) => {
    let resBody = { Spots: [] };

    const spots = await Spot.findAll({})

    spots.forEach(spot => {
        resBody.Spots.push(spot.toJSON())
    })


    for (let i = 0; i < resBody.Spots.length; i++) {
        let currentSpot = resBody.Spots[i]

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

    }

    res.json(resBody)
})
















module.exports = router;
