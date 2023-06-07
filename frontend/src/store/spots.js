//OPERATIONS DEFINED
const CREATE_SPOT = 'spots/CREATEspot';
const READ_SPOTS = 'spots/READspots'; //Plural
const READ_SPOT = 'spots/READspot'; //Singular
const UPDATE_SPOT = 'spots/UPDATEspot';
const DELETE_SPOT = 'spots/DELETEspot';

//Action Functions
const readSpots = payload => {
    return {
        type: READ_SPOTS,
        body: payload
    }
}

const readSpot = payload => {
    return {
        type: READ_SPOT,
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
        if (spotPrice && !isNaN(spotPrice)) {
            spotPrice = spotPrice.toFixed(2)
        }


        let spotAvgRating = spot.avgRating
        if (spotAvgRating && spotAvgRating !== "No reviews yet" && !isNaN(spotAvgRating)) {
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
        console.log(data)


        let dataPrice = data.price
        if (dataPrice && !isNaN(dataPrice)) {
            dataPrice = dataPrice.toFixed(2)
        }


        let dataAvgStarRating = data.avgStarRating
        if (dataAvgStarRating && dataAvgStarRating !== "No reviews yet" && !isNaN(dataAvgStarRating)) {
            dataAvgStarRating = data.avgStarRating.toFixed(1)
        }


        let normalized = { [data.id]: { ...data, price: dataPrice, avgStarRating: dataAvgStarRating} }
        dispatch(readSpot(normalized))
    } else {
        const errors = await req.json();
        return errors.errors
    }
}

const initialState = { allSpots: {}, singleSpot: {} }

const spotsReducer = (state = initialState, action) => {

    switch (action.type) {

        case READ_SPOTS: {
            return { ...state, allSpots: { ...action.body } }
        }

        case READ_SPOT: {
            return { ...state, singleSpot: { ...action.body } }
        }

        default: {
            return state
        }
    }
}

export default spotsReducer;
