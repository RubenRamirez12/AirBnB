import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { fetchOneSpot } from "../../store/spots";
import { useEffect, useState } from "react";
import './SpotDetails.css'
import { fetchReviews } from "../../store/reviews";




export default function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.singleSpot[spotId])
    const [spotImages, setSpotImages] = useState(null)
    const reviews = useSelector(state => state.reviews.spots[spotId])

    useEffect(() => {
        if (!spot) {
            dispatch(fetchOneSpot(spotId))
        }

        if (spot) {
            setSpotImages(spot.SpotImages)
        }

        if (spot && !reviews) {
            dispatch(fetchReviews(spotId))

        }
    }, [dispatch, spot, spotId, reviews])


    if (!spot || !spotImages || !reviews) {
        return <div>
            LOADING!!!
        </div>
    }

    console.log("HERE IT IS!", reviews)

    return (
        <div className="spotDetails">

            <div className="topDetails">
                <h1>{spot.name}</h1>
                <h2>{spot.city}, {spot.state}, {spot.country}</h2>
            </div>

            <div className="imageDetails">
                {/* mental note B.W. */}
                <div className="mainImageDetails">
                    {spotImages[0] && <img id="image1" className="sideImages" src={spotImages[0].url} />}
                </div>

                <div className="sideImageDetails">
                    {spotImages[1] && <img id="image2" className="sideImages" src={spotImages[1].url} />}
                    {spotImages[2] && <img id="image3" className="sideImages" src={spotImages[2].url} />}
                    {spotImages[3] && <img id="image4" className="sideImages" src={spotImages[3].url} />}
                    {spotImages[4] && <img id="image5" className="sideImages" src={spotImages[4].url} />}
                </div>

            </div>

            <div className="descriptionDetails">

                <div className="actualDescription">
                    <h1>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h1>

                    <p>{spot.description}</p>

                </div>

                <div className="reserveDiv">
                    <div className="topReserve">
                        <h1>${typeof spot.price === 'number' && spot.price.toFixed(2)}<span id="NIGHT"> night</span></h1>
                        <div className="rating-review">
                            <i className="fas fa-star">
                                {spot.avgStarRating === "No reviews yet" ? "New" : typeof spot.avgStarRating === 'number' && spot.avgStarRating.toFixed(1)}
                            </i>
                            ·
                            <div id="num-reviews">{spot.numReviews} reviews</div>
                        </div>
                    </div>

                    <button id="reserveButton" onClick={(e) => {}}
                    >
                        Reserve
                    </button>
                </div>

            </div>

            <div className="reviewDetails">
                <h1>
                    <i className="fas fa-star">{spot.avgStarRating === "No reviews yet" ? "New" : typeof spot.avgStarRating === 'number' && spot.avgStarRating.toFixed(1)}   ·   {spot.numReviews} reviews</i>
                </h1>
                <ul className="reviewList">
                    {reviews.map(review => {
                        console.log(review)
                        console.log("SPOT TO SEE LIVE", spot);
                        console.log("AVG RATING", spot.avgStarRating);
                        console.log("PRICE", spot.price)
                        console.log("RISK", spot.avgStarRating.toFixed(2))
                        let reviewDate = new Date(review.createdAt).toLocaleString('en-US', {month: 'long', year: "numeric"})
                        return (
                            <li key={review.id} className="reviewListItem">
                                <div id="reviewName">{review.User.firstName} {review.User.lastName}</div>
                                <div id="reviewDate">{reviewDate}</div>
                                <div id="reviewParagraph">{review.review}</div>
                            </li>
                        )
                    })}
                </ul>
            </div>

        </div>
    )
}
