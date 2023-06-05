//OPERATIONS DEFINED
const CREATE_SPOT = 'spots/CREATEspot';
const READ_SPOTS = 'spots/READspots';
const UPDATE_SPOT = 'spots/UPDATEspot';
const DELETE_SPOT = 'spots/DELETEspot';

//Action Functions
const readSpots = payload => {
    return {
        type: READ_SPOTS,
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

const spotsReducer = (state = {allSpots: {},singleSpot: {}}, action) => {

    switch (action.type) {

        case READ_SPOTS : {
            return { ...state, allSpots: {...action.body} }
        }

        default: {
            return state
        }
    }
}

export default spotsReducer;
