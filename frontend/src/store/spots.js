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

    for (let spot of data.Spots) {
        allSpots[spot.id] = spot
    }

    dispatch(readSpots(allSpots))
}

export const fetchOneSpot = (spotId) => async dispatch => {
    const req = await fetch (`/api/spots/${spotId}`)

    if (req.ok) {
        const data = await req.json();
        let normalized = {[data.id]: data}
        dispatch(readSpot(normalized))
    } else {
        const errors = await req.json();
        return errors.errors
    }
}

const initialState = {allSpots: {},singleSpot: {}}

const spotsReducer = (state = initialState, action) => {

    switch (action.type) {

        case READ_SPOTS : {
            return { ...state, allSpots: {...action.body} }
        }

        case READ_SPOT: {
            return { ...state, singleSpot: {...action.body}}
        }

        default: {
            return state
        }
    }
}

export default spotsReducer;
