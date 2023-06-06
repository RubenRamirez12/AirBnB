

//Operations Defined
const READ_REVIEWS = 'reviews/READreviews'






//Action Functions
const readReviews = payload => {
    return {
        type: READ_REVIEWS,
        body: payload
    }
}




//Thunks
export const fetchReviews = (spotId) => async (dispatch) => {
    const req = await fetch(`/api/spots/${spotId}/reviews`)

    if (req.ok) {
        const data = await req.json()

        const normalized = {[spotId]: []}

        for (let review of data.Reviews) {
            normalized[spotId].push(review)
        }

        dispatch(readReviews(normalized))
        
    } else {
        const errors = await req.json()
        return errors.errors
    }
}

const initialState = { spots: {}, users: {}}

const reviewsReducer = (state = initialState, action) => {

    switch (action.type) {

        case READ_REVIEWS: {
            return {...state, spots: {...action.body}}
        }

        default: {
            return state
        }
    }
}

export default reviewsReducer;
