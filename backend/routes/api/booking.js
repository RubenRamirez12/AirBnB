const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { reviewFormater } = require('../../utils/review-utils');
const { bookingFormater, isValidDate } = require('../../utils/booking-utils')
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require("../../db/models");
const { Op } = require('sequelize');

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

//Edit a booking
//req authentication and authorization: true
router.put('/:bookingId', requireAuth, async (req, res) => {
  const currentBooking = await Booking.findByPk(req.params.bookingId)
  const { startDate, endDate } = req.body;

  let currentStart = "";
  let currentStartDate = ""
  if (startDate) {
    currentStart = startDate
    currentStartDate = new Date(startDate)
  } else {
    currentStart = currentBooking.startDate
    currentStartDate = new Date(currentBooking.startDate)
  }

  let currentEnd = "";
  let currentEndDate = ""
  if (endDate) {
    currentEnd = endDate
    currentEndDate = new Date(endDate)
  } else {
    currentEnd = currentBooking.endDate
    currentEndDate = new Date(currentBooking.endDate)
  }


  if (currentBooking && currentBooking.userId === req.user.id) {
    if (currentStartDate < currentEndDate) {
      let valid = await isValidDate(currentBooking.spotId, currentStart, currentEnd)
      if (valid) {
        try {
          currentBooking.startDate = currentStart;
          await currentBooking.save()
          currentBooking.endDate = currentEnd;
          await currentBooking.save()

          res.json(currentBooking)
        } catch {
          res.status(400).json({
            message: "Bad Request", // (or "Validation error" if generated by Sequelize),
            errors: {
              endDate: "endDate cannot come before startDate"
            }
          })
        }
      } else {
        res.status(403).json({
          message: "Sorry, this spot is already booked for the specified dates",
          errors: {
            startDate: "Start date conflicts with an existing booking",
            endDate: "End date conflicts with an existing booking"
          }
        })
      }
    } else {
      res.status(403).json({
        message: "Past bookings can't be modified"
      })
    }
  } else {
    res.status(404).json({
      message: "Booking couldn't be found"
    })
  }
})

//Delete a Booking
//require authentication and authorization: TRUE
router.delete('/:bookingId', requireAuth, async (req, res) => {
  const currentBooking = await Booking.findByPk(req.params.bookingId);

  if (currentBooking && currentBooking.userId === req.user.id) {
    let todaysDate = new Date()
    let bookedStartDate = new Date(currentBooking.startDate)


    if (bookedStartDate < todaysDate) {
      res.status(403).json({
        message: "Bookings that have been started can't be deleted"
      })
    } else {
      await currentBooking.destroy()
      res.json({
        message: "Successfully deleted"
      })
    }
  } else {
    res.status(404).json({
      message: "Booking couldn't be found"
    })
  }
})












module.exports = router
