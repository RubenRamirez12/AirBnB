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

//Add an image to a Review based on the Review's Id
//require Authentication: TRUE
//require authorization: TRUE
router.post("/:reviewId/images", requireAuth, async (req, res) => {
    const { url } = req.body
    const review = await Review.findByPk(req.params.reviewId)

    if (review && review.userId === req.user.id) {

        const userReviews = await Review.findAll({
            where: {
                userId: req.user.id
            }
        });




        if (userReviews.length < 10) {
            const newReviewImage = await ReviewImage.create({
                reviewId: req.params.reviewId,
                url: url
            });

            res.json(newReviewImage);
        } else {
            res.status(403).json({
                message: "Maximum number of images for this resource was reached"
            })
        }
    } else {
        res.status(404).json({
            message: "Review couldn't be found"
        })
    }
})

router.put('/:reviewId', requireAuth, async (req, res) => {
    const { review, stars } = req.body
    const currentReview = await Review.findByPk(req.params.reviewId);

    if (currentReview && currentReview.userId === req.user.id) {
        if (review) {
            currentReview.review = review;
        }

        if (stars) {
            currentReview.stars = stars
        }

        try {
            await currentReview.save();
            res.json(currentReview)
        } catch {
            res.status(400).json({
                message: "Bad Request",
                errors: {
                    review: "Review text is required",
                    stars: "Stars must be an integer from 1 to 5"
                }
            })
        }
    } else {
        res.status(404).json({
            message: "Review couldn't be found"
        })
    }
})






module.exports = router;
