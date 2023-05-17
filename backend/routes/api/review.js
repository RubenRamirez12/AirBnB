const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { reviewFormater } = require('../../utils/review-utils')
const { Spot, SpotImage, Review, User, ReviewImage } = require("../../db/models");





//get all reviews of current User
// require authentication: true
router.get('/current', requireAuth, async (req, res) => {
    let resBody = { Reviews: [] }

    const allReviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        attributes: ["id", "userId", "spotId", "review", "stars", "createdAt", "updatedAt"],
        include: {
            model: User,
            attributes: ["id", "firstName", "lastName"]
        }
    })

    for (let i = 0; i < allReviews.length; i++) {
        const currentReview = allReviews[i]
        resBody.Reviews.push(await reviewFormater(currentReview))
    }


    res.json(resBody)
})










module.exports = router;
