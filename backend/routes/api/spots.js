const express = require("express");
const router = express.Router();

const { Spot, SpotImage, Review, User } = require("../../db/models");



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


router.get('/', async (req, res) => {

    let resBody = { Spots: []};

    const spots = await Spot.findAll({})

    for (let i = 0; i < spots.length; i++) {
        resBody.Spots.push(await spotFormater(spots[i]))
    }

    res.json(resBody)
});





router.get('/current', async (req, res) => {
    let resBody = { Spots: [] };

    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        }
    })

    for (let i = 0; i < spots.length; i++) {
        resBody.Spots.push(await spotFormater(spots[i]))
    }

    res.json(resBody)
})

router.get('/:spotId', async (req, res) => {

    const spot = await Spot.findByPk(req.params.spotId, {
        include: [{
            model: SpotImage,
            attributes: ["id", "url", "preview"]
        },
        {
            model: User,
            attributes: ["id", "firstName", "lastName"]
        }
        ]
    })

    let pojoSpot = spot.toJSON();

    const reviews = await Review.findAll({
        where: {
            spotId: pojoSpot.id
        }
    });
    let totalReviews = reviews.length;

    let rating = 0;

    reviews.forEach(review => {
        rating += review.stars
    })

    pojoSpot.numReviews = totalReviews;
    if (rating > 0) {
        pojoSpot.avgStarRating = rating / totalReviews
    } else {
        pojoSpot.avgStarRating = 0
    }

    res.json(pojoSpot)

})
















module.exports = router;
