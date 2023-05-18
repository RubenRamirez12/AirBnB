const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { reviewFormater } = require('../../utils/review-utils');
const { bookingFormater } = require('../../utils/booking-utils')
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require("../../db/models");


router.delete('/:imageId', requireAuth, async (req, res) => {
    const currentImage = await SpotImage.findByPk(req.params.imageId);

    if (currentImage) {
        const currentSpot = await Spot.findByPk(currentImage.spotId)

        if (currentSpot && currentSpot.ownerId === req.user.id) {
            await currentImage.destroy()

            res.json({
                message: "Successfully deleted"
            })
        } else {
            res.status(404).json({
                message: "Spot Image couldn't be found"
            })
        }
    } else {
        res.status(404).json({
            message: "Spot Image couldn't be found"
        })
    }
})

module.exports = router
