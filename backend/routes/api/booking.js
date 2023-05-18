const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { reviewFormater } = require('../../utils/review-utils');
const { bookingFormater } = require('../../utils/booking-utils')
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require("../../db/models");

//get all of the current Users Bookings
//require authentication: true
router.get('/current', requireAuth, async (req, res) => {
    let resBody = { Bookings: [] }

    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        attributes: ["id", "spotId", "userId", "startDate", "endDate", "createdAt", "updatedAt"]
    })

    for (let i = 0; i < bookings.length; i++) {
        let currentBooking = bookings[i]
        resBody.Bookings.push(await bookingFormater(currentBooking))
    }

    res.json(resBody)
})














module.exports = router
