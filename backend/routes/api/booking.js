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
// router.put('/:bookingId', requireAuth, async (req, res) => {
//   const currentBooking = await Booking.findByPk(req.params.bookingId)
//   const { startDate, endDate } = req.body

//   if (currentBooking) {
//     let oldDate = new Date(currentBooking.endDate);
//     let todayDate = new Date();
//     if (oldDate > todayDate) {
//       //old date is in future
//       if (startDate || endDate) {
//         let spotId = currentBooking.spotId
//         let start = ""
//         let end = ""

//         if (startDate) {
//           start = startDate
//         } else {
//           start = currentBooking.startDate
//         }

//         if (endDate) {
//           end = endDate
//         } else {
//           end = currentBooking.endDate
//         }

//         if (await isValidDate(spotId, start, end)) {
//           currentBooking.startDate = start;
//           currentBooking.endDate = end;

//           await currentBooking.save()
//           res.json(currentBooking)
//         } else {
//           res.status(403).json({
//             message: "Please enter valid date information"
//           })
//         }
//       } else {
//         res.status(403).json({
//           message: "please provide what dates you would like to change"
//         })
//       }
//     } else {
//       //old date is in the past and cant be modified
//       res.status(403).json({
//         message: "Past Bookings can't be modified"
//       })
//     }
//   } else {
//     //if spot doesnt exist
//     res.status(404).json({
//       message: "Booking couldn't be found"
//     })
//   }
// })

//edit a booking
router.put('/:bookingId', requireAuth, async (req, res) => {
  const currentBooking = await Booking.findByPk(req.params.bookingId)
  const { startDate, endDate } = req.body;


  //no edit body
  // if (!startDate && !endDate) {

  // }




  let currentStart = "";
  let currentStartDate = ""
  if (startDate) {
    currentStart = startDate
    currentStartDate = new Date (startDate)
  } else {
    currentStart = currentBooking.startDate
    currentStartDate = new Date (currentBooking.startDate)
  }

  let currentEnd = "";
  let currentEndDate = ""
  if (endDate) {
    currentEnd = endDate
    currentEndDate = new Date (endDate)
  } else {
    currentEnd = currentBooking.endDate
    currentEndDate = new Date (currentBooking.endDate)
  }










  if (currentBooking && currentBooking.userId === req.user.id) {
    if (currentStartDate < currentEndDate) {
      let valid = await isValidDate(currentBooking.spotId, currentStart, currentEnd)
      if (valid) {
        currentBooking.startDate = currentStart;
        currentBooking.endDate = currentEnd;
        await currentBooking.save()
        res.json(currentBooking)
      } else {
        res.json("please input valid date")
      }
    } else {
      res.json("START IS LARGER THAN END")
    }
  } else {
    //user doesnt own booking, or booking doesnt exist
    res.json("Booking NOT FOUND")
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
