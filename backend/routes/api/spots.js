const express = require("express");
const router = express.Router();
const spotFormater = require("../../utils/spot-utils")
const { requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, Review, User } = require("../../db/models");


//Get All Spots // Authentication: FALSE
router.get('/', async (req, res) => {

  let resBody = { Spots: [] };

  const spots = await Spot.findAll({})

  for (let i = 0; i < spots.length; i++) {
    resBody.Spots.push(await spotFormater(spots[i]))
  }

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
