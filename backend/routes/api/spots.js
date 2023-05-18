const express = require("express");
const router = express.Router();
const spotFormater = require("../../utils/spot-utils")
const { requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, Review, User, Booking } = require("../../db/models");
const { reviewFormater, reviewFormaterNoSpot } = require('../../utils/review-utils')
const { bookingFormater, bookingFormaterOwner } = require('../../utils/booking-utils')
const { Op } = require('sequelize');

//Get All Spots
//Authentication: FALSE
router.get('/', async (req, res) => {
  let resBody = { Spots: [] };
  let where = {};
  let pagination = {}
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query


  if ((page && isNaN(page)) || (size && isNaN(size)) || (minLat && isNaN(minLat)) || (maxLat && isNaN(maxLat)) || (minLng && isNaN(minLng)) || (maxLng && isNaN(maxLng)) || (minPrice && isNaN(minPrice)) || (maxPrice && isNaN(maxPrice))) {
    res.status(400).json({
      message: "Bad Request", // (or "Validation error" if generated by Sequelize),
      errors: {
        page: "Page must be greater than or equal to 1",
        size: "Size must be greater than or equal to 1",
        maxLat: "Maximum latitude is invalid",
        minLat: "Minimum latitude is invalid",
        minLng: "Maximum longitude is invalid",
        maxLng: "Minimum longitude is invalid",
        minPrice: "Minimum price must be greater than or equal to 0",
        maxPrice: "Maximum price must be greater than or equal to 0"
      }
    })
  }





  if (!page) {
    page = 1
  } else if (page < 1) {
    page = 1
  } else if (page > 10) {
    page = 10
  }

  if (!size) {
    size = 20
  } else if (size < 1) {
    size = 1
  } else if (size > 10) {
    size = 20
  }

  pagination.limit = size;
  pagination.offset = (page - 1) * size

  if (minLat && maxLat) {
    where.lat = {
      [Op.between]: [minLat, maxLat]
    }
  } else if (minLat) {
    where.lat = {
      [Op.gte]: minLat
    }
  } else if (maxLat) {
    where.lat = {
      [Op.lte]: maxLat
    }
  } else {

  }

  if (minLng && maxLng) {
    where.lng = {
      [Op.between]: [minLng, maxLng]
    }
  } else if (minLng) {
    where.lng = {
      [Op.gte]: minLng
    }
  } else if (maxLng) {
    where.lng = {
      [Op.lte]: maxLng
    }
  } else {

  }

  if (minPrice && maxPrice) {
    where.price = {
      [Op.between]: [minPrice, maxPrice]
    }
  } else if (minPrice) {
    where.price = {
      [Op.gte]: minPrice
    }
  } else if (maxPrice) {
    where.price = {
      [Op.lte]: maxPrice
    }
  }

  const spots = await Spot.findAll({
    where,
    ...pagination
  })

  for (let i = 0; i < spots.length; i++) {
    resBody.Spots.push(await spotFormater(spots[i]))
  }

  resBody.page = parseInt(page);
  resBody.size = parseInt(size);
  res.json(resBody)
});




//Get All Spots owned by current Owner //
// Authentication: TRUE
router.get('/current', requireAuth, async (req, res) => {
  let resBody = { Spots: [] };
  console.log(requireAuth)
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

//create a spot
//require Authentication: true
router.post('/', requireAuth, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  if (address && city && state && country && lat && lng && name && description && price) {
    const newSpot = await Spot.create({
      ownerId: req.user.id,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    })

    res.status(201).json(newSpot)
  } else {
    res.status(400).json({
      message: "Bad Request", // (or "Validation error" if generated by Sequelize),
      errors: {
        address: "Street address is required",
        city: "City is required",
        state: "State is required",
        country: "Country is required",
        lat: "Latitude is not valid",
        lng: "Longitude is not valid",
        name: "Name must be less than 50 characters",
        description: "Description is required",
        price: "Price per day is required"
      }
    })

  }


});

//Add an image to a Spot based on the Spot's Id
//Require Authentication: true
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const { url, preview } = req.body;
  const theSpot = await Spot.findByPk(req.params.spotId);

  console.log(theSpot.ownerId, req.user.id)
  if (theSpot.ownerId === req.user.id) {
    const newSpotImage = await SpotImage.create({
      spotId: req.params.spotId,
      url: url,
      preview: preview
    });

    const filteredNewSpot = await SpotImage.findByPk(newSpotImage.id, {
      attributes: ["id", "url", "preview"]
    });

    res.json(filteredNewSpot)
  } else {
    res.status(404).json({
      message: "Spot couldn't be found"
    })
  }

})

//Get all bookings for a spot based on the spots id
//require authentication true
router.get("/:spotId/bookings", requireAuth, async (req, res) => {

  const spot = await Spot.findByPk(req.params.spotId)

  if (spot) {
    if (spot.ownerId === req.user.id) {
      //if current User owns the spot
      resBody = { Bookings: [] }
      const bookings = await Booking.findAll({
        where: {
          spotId: req.params.spotId
        }
      });

      for (let i = 0; i < bookings.length; i++) {
        let currentBooking = bookings[i]
        resBody.Bookings.push(await bookingFormaterOwner(currentBooking))
      }

      res.json(resBody)

    } else {
      //Current User Does NOT own the spot
      const bookings = await Booking.findAll({
        where: {
          spotId: req.params.spotId
        },
        attributes: ["spotId", "startDate", "endDate"]
      });

      res.json({ Bookings: bookings })
    }
  } else {
    res.status(404).json({
      message: "Spot couldn't be found"
    })
  }


})

//Create a booking from a spot based on the spots id
//require authentiation and must not belong to current user
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
  const { startDate, endDate } = req.body
  const currentSpot = await Spot.findByPk(req.params.spotId)

  if (currentSpot) {
    if (currentSpot.ownerId !== req.user.id) {
      //if user is not the owner of the spot

      const currentBookings = await Booking.findAll({
        where: {
          [Op.or]: [
            {
              startDate: {
                [Op.between]: [startDate, endDate]
              },
              endDate: {
                [Op.between]: [startDate, endDate]
              },
            },
          ],
        }
      })

      if (currentBookings.length === 0) {
        //timeframe for booking is not taken
        if (startDate && endDate) {
          let convertStart = new Date(startDate)
          let currentDate = new Date
          if (convertStart > currentDate) {
            try {
              //tries to create new booking
              const newBooking = await Booking.create({
                spotId: parseInt(req.params.spotId),
                userId: req.user.id,
                startDate: startDate,
                endDate: endDate
              })
              await newBooking.save();

              res.json(newBooking)
            } catch {
              //throws error if booking is invalid
              res.status(400).json({
                message: "Bad Request",
                errors: {
                  endDate: "endDate cannot be on or before StartDate"
                }
              })
            }
          } else {
            //startDate is before currentDate
            res.status(400).json({
              message: "Bad Request",
              errors: {
                startDate: "You cannot choose a date that has already past as a start date"
              }
            })
          }
        } else {
          res.status(400).json({
            message: "startDate and EndDate cannot be empty"
          })
        }




      } else {
        //if bookings exist, timeframe is taken
        res.status(403).json({
          message: "Sorry, this spot is already booked for the specified dates",
          errors: {
            startDate: "Start date conflicts with an existing booking",
            endDate: "End Date conflicts with an existing booking"
          }
        })
      }




    } else {
      //if user is owner of spot, not allowed to book
      res.status(403).json({
        messae: "You cannot book a stay in your own spot!"
      })
    }





  } else {
    //if spot doesnt exist
    res.status(404).json({
      message: "Spot couldn't be found"
    })
  }
})










//get all reviews by a spot's id
//require authentication: false
router.get('/:spotId/reviews', async (req, res) => {
  resBody = { Reviews: [] }

  const reviews = await Review.findAll({
    where: {
      spotId: req.params.spotId
    },
    attributes: ["id", "userId", "spotId", "review", "stars", "createdAt", "updatedAt"],
    include: {
      model: User,
      attributes: ["id", "firstName", "lastName"]
    }
  });

  if (reviews.length > 0) {
    for (let i = 0; i < reviews.length; i++) {
      let currentReview = reviews[i];
      resBody.Reviews.push(await reviewFormaterNoSpot(currentReview))
    }
  } else {
    res.status(404).json({
      message: "Spot couldn't be found"
    })
  }


  res.json(resBody)
})

//Create a review for a spot based on the spot's Id
//Require Authentication: true
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
  const { review, stars } = req.body;
  const currentSpot = await Spot.findByPk(req.params.spotId)
  const oldReview = await Review.findOne({
    where: {
      spotId: req.params.spotId,
      userId: req.user.id
    }
  })
  if (currentSpot) {
    if (!oldReview) {
      try {
        let newReview = await Review.create({
          spotId: parseInt(req.params.spotId),
          userId: req.user.id,
          review: review,
          stars: stars
        });

        res.status(201).json(newReview)
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
      res.status(500).json({
        message: "User already has a review for this spot"
      })
    }
  } else {
    res.status(404).json({
      message: "Spot couldn't be found"
    })
  }
})

//Get details of a Spot from an id
//Require Authentication: false
router.get('/:spotId', async (req, res) => {

  const spot = await Spot.findByPk(req.params.spotId, {
    include: [{
      model: SpotImage,
      attributes: ["id", "url", "preview"]
    },
    {
      model: User,
      attributes: ["id", "firstName", "lastName"],
      as: "Owner"
    }
    ]
  })

  if (spot) {
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
  } else {
    res.status(404).json({
      message: "Spot couldn't be found"
    })
  }

})

//Edit a Spot
//require Authentication: True
router.put('/:spotId', requireAuth, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const spot = await Spot.findByPk(req.params.spotId)

  if (spot.ownerId === req.user.id) {

    if (address) {
      spot.address = address;
    }

    if (city) {
      spot.city = city;
    }

    if (state) {
      spot.state = state;
    }

    if (country) {
      spot.country = country;
    }

    if (lat) {
      spot.lat = lat;
    }

    if (lng) {
      spot.lng = lng;
    }

    if (name) {
      spot.name = name;
    }

    if (description) {
      spot.description = description
    }

    if (price) {
      spot.price = price;
    }

    try {
      await spot.save();
      res.json(spot)
    } catch {
      res.status(400).json({
        message: "Bad Request", // (or "Validation error" if generated by Sequelize),
        errors: {
          address: "Street address is required",
          city: "City is required",
          state: "State is required",
          country: "Country is required",
          lat: "Latitude is not valid",
          lng: "Longitude is not valid",
          name: "Name must be less than 50 characters",
          description: "Description is required",
          price: "Price per day is required"
        }
      })
    }

  } else {
    res.status(404).json({
      message: "Spot couldn't be found"
    })
  }
})

//Delete a spot
//require Authentication: true
router.delete("/:spotId", requireAuth, async (req, res) => {
  const theSpot = await Spot.findByPk(req.params.spotId);

  if (theSpot && theSpot.ownerId === req.user.id) {
    await theSpot.destroy()

    res.json({
      message: "Successfully deleted"
    })
  } else {
    res.status(404).json({
      message: "Spot couldn't be found"
    })
  }

})


module.exports = router;
