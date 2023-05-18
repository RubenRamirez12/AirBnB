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
    const currentReview = await Review.findByPk(req.params.reviewId)

    if (currentReview && currentReview.userId === req.user.id) {

        const userImages = await ReviewImage.findAll({
            where: {
                reviewId: currentReview.id
            }
        });

        if (userImages.length < 10) {
            const newReviewImage = await ReviewImage.create({
                reviewId: parseInt(req.params.reviewId),
                url: url
            });

            const theNewImage = await ReviewImage.findByPk(newReviewImage.id, {
                attributes: ["id", "url"]
            });
            res.json(theNewImage);
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
//edit a review
//require authentication and authorization : TRUE
router.put('/:reviewId', requireAuth, async (req, res) => {
    const { review, stars } = req.body
    const currentReview = await Review.findByPk(req.params.reviewId);

    if (currentReview && currentReview.userId === req.user.id) {
        try {
            if (review) {
                currentReview.review = review;
                await currentReview.save()
            }

            if (stars) {
                currentReview.stars = parseInt(stars)
                await currentReview.save()
            }

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

//DELETE A REVIEW
//require authentication and authorization: TRUE
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const currentReview = await Review.findByPk(req.params.reviewId);

    if (currentReview && currentReview.userId === req.user.id) {
        await currentReview.destroy();

        res.json({
            message: "Successfully deleted"
        })
    } else {
        res.status(404).json({
            message: "Review couldn't be found"
        })
    }
})




module.exports = router;
