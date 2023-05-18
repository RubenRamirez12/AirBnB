const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { reviewFormater } = require('../../utils/review-utils');
const { bookingFormater } = require('../../utils/booking-utils')
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require("../../db/models");

//delete a review image
//require authentication and authorization
router.delete('/:imageId', requireAuth, async (req, res) => {
    const currentImage = await ReviewImage.findByPk(req.params.imageId);

    if (currentImage) {
        const currentReview = await Review.findByPk(currentImage.reviewId)
        if (currentReview && currentReview.userId === req.user.id) {
            await currentImage.destroy()

            res.json({
                message: "Successfully deleted"
            })
        } else {
            res.status(404).json({
                message: "Review Image couldn't be found"
            })
        }
    } else {
        res.status(404).json({
            message: "Review Image couldn't be found"
        })
    }
})















module.exports = router
