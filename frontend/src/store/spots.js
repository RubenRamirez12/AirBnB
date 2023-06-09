import { csrfFetch } from "./csrf";

//OPERATIONS DEFINED
const CREATE_SPOT = 'spots/CREATEspot';
const READ_SPOTS = 'spots/READspots'; //Plural
const READ_SPOT = 'spots/READspot'; //Singular
const READ_USER_SPOTS = 'spots/READuserspots'
const UPDATE_SPOT = 'spots/UPDATEspot';
const DELETE_SPOT = 'spots/DELETEspot';

//Action Functions
//plural - catalog
const readSpots = payload => {
  return {
    type: READ_SPOTS,
    body: payload
  }
}

//singular - spotDetails
const readSpot = payload => {
  return {
    type: READ_SPOT,
    body: payload
  }
}

const createSpot = payload => {
  return {
    type: CREATE_SPOT,
    body: payload
  }
}

const readCurrentUserSpots = payload => {
  return {
    type: READ_USER_SPOTS,
    body: payload
  }
}

const deleteSpot = payload => {
  return {
    type: DELETE_SPOT,
    body: payload
  }
}

const updateSpot = payload => {
  return {
    type: UPDATE_SPOT,
    body: payload
  }
}
//Thunks
export const fetchAllSpots = () => async (dispatch) => {
  const req = await fetch('/api/spots');
  const data = await req.json();

  let allSpots = {};
  //normalizing spots, and fixing decimal to make price and rating decimal wanted
  for (let spot of data.Spots) {

    let spotPrice = spot.price
    if (spotPrice && typeof spotPrice === 'number' && typeof spotPrice !== 'string') {
      spotPrice = spotPrice.toFixed(2)
    }


    let spotAvgRating = spot.avgRating
    if (spotAvgRating && spotAvgRating !== "No reviews yet" && typeof spotAvgRating === 'number' && typeof spotAvgRating !== 'string') {
      spotAvgRating = spot.avgRating.toFixed(1)
    }

    allSpots[spot.id] = { ...spot, price: spotPrice, avgRating: spotAvgRating }
  }

  dispatch(readSpots(allSpots))
}

export const fetchOneSpot = (spotId) => async dispatch => {
  const req = await fetch(`/api/spots/${spotId}`)

  if (req.ok) {
    const data = await req.json();


    let dataPrice = data.price
    if (dataPrice && typeof dataPrice === 'number' && typeof dataPrice !== 'string') {
      dataPrice = dataPrice.toFixed(2)
    }


    let dataAvgStarRating = data.avgStarRating
    if (dataAvgStarRating && dataAvgStarRating !== "No reviews yet" && typeof dataAvgStarRating === 'number' && typeof dataAvgStarRating !== 'string') {
      dataAvgStarRating = data.avgStarRating.toFixed(1)
    }


    let normalized = { ...data, price: dataPrice, avgStarRating: dataAvgStarRating }
    dispatch(readSpot(normalized))

    return normalized;
  } else {
    const errors = await req.json();
    return errors.errors
  }
}

export const spotCreator = (payload) => async (dispatch) => {
  const { address, city, state, country, lat, lng, name, description, price, photos } = payload
  const res = await csrfFetch(`/api/spots`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
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
  })

  if (res.ok) {
    const data = await res.json()

    let currentPhotos = photos.filter(photo => photo)

    for (let i = 0; i < currentPhotos.length; i++) {
      let thePhoto = currentPhotos[i]

      const res = csrfFetch(`/api/spots/${data.id}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: thePhoto,
          preview: i === 0 ? true : false
        })
      })
    }

    dispatch(createSpot({
      ...data,
      previewImage: currentPhotos[0],
      avgRating: "No reviews yet"
    }))

    return data
  } else {
    const errors = await res.json();

    return errors.errors
  }

}

export const getCurrentUserSpots = () => async (dispatch) => {
  const req = await csrfFetch('/api/spots/current', {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  })

  const data = await req.json();

  let userSpots = {};

  for (let spot of data.Spots) {

    let spotPrice = spot.price
    if (spotPrice && typeof spotPrice === 'number' && typeof spotPrice !== 'string') {
      spotPrice = spotPrice.toFixed(2)
    }


    let spotAvgRating = spot.avgRating
    if (spotAvgRating && spotAvgRating !== "No reviews yet" && typeof spotAvgRating === 'number' && typeof spotAvgRating !== 'string') {
      spotAvgRating = spot.avgRating.toFixed(1)
    }

    userSpots[spot.id] = { ...spot, price: spotPrice, avgRating: spotAvgRating }
  }

  dispatch(readCurrentUserSpots(userSpots))
}

export const spotDelete = (spotId) => async (dispatch) => {
  const req = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  })

  if (req.ok) {
    dispatch(deleteSpot(spotId))
  } else {
    return await req.json().errors
  }

}

export const spotUpdator = (payload) => async (dispatch) => {
  const { spotId, address, city, state, country, lat, lng, name, description, price, photos, photoIds, avgRating } = payload
  const req = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
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
  });

  if (req.ok) {
    const data = await req.json()

    for (let i = 0; i < photoIds.length; i++) {
      await csrfFetch(`/api/spot-images/${photoIds[i]}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
    }

    let currentPhotos = photos.filter(photo => photo)
    for (let i = 0; i < currentPhotos.length; i++) {
      let thePhoto = currentPhotos[i]

      const res = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: thePhoto,
          preview: i === 0 ? true : false
        })
      })
    }


    dispatch(updateSpot({
      ...data,
      previewImage: currentPhotos[0],
      avgRating
    }))
  }
}




const initialState = { allSpots: {}, singleSpot: {}, userSpots: {} }

const spotsReducer = (state = initialState, action) => {

  switch (action.type) {

    case CREATE_SPOT: {
      return { ...state, allSpots: { ...state.allSpots, [action.body.id]: action.body } }
    }

    case READ_SPOTS: {
      return { ...state, allSpots: { ...action.body } }
    }

    case READ_SPOT: {
      return { ...state, singleSpot: { ...state.singleSpot, [action.body.id]: action.body } }
    }

    case READ_USER_SPOTS: {
      return { ...state, userSpots: {...action.body} }
    }

    case UPDATE_SPOT: {
      return { ...state, singleSpot: { ...state.singleSpot, [action.body.id]: action.body } }
    }

    case DELETE_SPOT: {
      let filtered = { ...state.userSpots }

      delete filtered[action.body]

      return { ...state, userSpots: { ...filtered } }
    }

    default: {
      return state
    }

  }
}

export default spotsReducer;
