import { Link } from "react-router-dom";
import './SpotCard.css'
import { useEffect } from "react";



export default function SpotCard({ spot }) {
    return (
        <div className="wholeSpot">

            <Link className="ImageLink" to={`/spots/${spot.id}`}>
                <img className="spotImage" src={spot.previewImage} />
            </Link>

            <div className="spotInfo">

                <div id="topInfo">

                    <Link to={`/spots/${spot.id}`} id="topLeftInfo">
                        {spot.city}, {spot.state}
                    </Link>

                    <Link to={`/spots/${spot.id}`} id="topRightInfo">
                        <i className="fa fa-star">
                            {spot.avgRating === "No reviews yet" ? "New" : spot.avgRating}
                        </i>
                    </Link>

                </div>

                <Link to={`/spots/${spot.id}`} id="bottomInfo">
                    <div id='price'>${spot.price}</div> night
                </Link>

            </div>

        </div >
    )
}



// useEffect(() => {
//     if (!spot || !loadedSpot) {
//         dispatch(fetchOneSpot(spotId))
//         setLoadedSpot(true)
//     }

//     if (spot && loadedSpot && spot.numReviews > 0) {
//         dispatch(fetchReviews(spotId))
//         setLoadedReviews(true)
//     } else {
//         setLoadedReviews(true)
//     }

//     if (reviews && loadedReviews && reviews.length > 0) {
//         let totalRating = 0;

//         reviews.forEach(review => {
//             totalRating += review.stars
//         })

//         let avg = (totalRating / reviews.length).toFixed(1)

//         setAvgStarRating(avg)
//     } else {
//         setAvgStarRating("New")
//     }

//     if (spot && loadedSpot) {
//         setSpotImages(spot.SpotImages)
//         setLoadedImages(true)
//     }

//     if (reviews && loadedReviews) {
//         setNumReviews(review.length)
//     }


// }, [dispatch, spotId, spot, loadedSpot, loadedImages, loadedReviews])
