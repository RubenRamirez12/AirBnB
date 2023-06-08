import { csrfFetch } from "./csrf"

//Operations Defined
const READ_REVIEWS = 'reviews/READreviews'
const CREATE_REVIEW = 'reviews/CREATEreview'
const DELETE_REVIEW = 'reviews/DELETEreview'




//Action Functions
const readReviews = payload => {
    return {
        type: READ_REVIEWS,
        body: payload
    }
}

const createReview = payload => {
    return {
        type: CREATE_REVIEW,
        body: payload
    }
}

const deleteReview = payload => {
    return {
        type: DELETE_REVIEW,
        body: payload
    }
}


//Thunks
export const fetchReviews = (spotId) => async (dispatch) => {
    const req = await fetch(`/api/spots/${spotId}/reviews`)

    if (req.ok) {
        const data = await req.json()

        const normalized = { [spotId]: [] }

        for (let review of data.Reviews) {
            normalized[spotId].push(review)
        }
        dispatch(readReviews(normalized))
    } else {
        const errors = await req.json()
        return errors.errors
    }
}

export const reviewCreator = (payload) => async (dispatch) => {
    const { spotId, review, stars } = payload
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            review,
            stars
        })
    })

    if (res.ok) {
        dispatch(fetchReviews(spotId))
        return res
    } else {
        return await res.json().errors
    }
}

export const DeleteAReview = (payload) => async (dispatch) => {
    const { reviewId, spotId } = payload;

    const req = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
        headers: { "Content-Type" : "application/json" }
    })

    if (req.ok) {
        dispatch(deleteReview({ reviewId, spotId }))
    } else {
        return await req.json().errors
    }
}



const initialState = { spots: {}, users: {} }

const reviewsReducer = (state = initialState, action) => {

    switch (action.type) {

        case READ_REVIEWS: {
            return { ...state, spots: { ...action.body } }
        }

        case DELETE_REVIEW: {
            let filtered = state.spots[action.body.spotId].filter(review => review.id !== action.body.reviewId)
            return {...state, spots: { ...state.spots ,[action.body.spotId]:filtered } }
        }

        default: {
            return state
        }

    }

}



export default reviewsReducer;
