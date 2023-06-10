import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { fetchOneSpot } from "../../store/spots";
import { useEffect, useState } from "react";
import './SpotDetails.css'
import { fetchReviews } from "../../store/reviews";
import OpenModalReview from "./OpenModalReview";
import ReviewFormModal from "../ReviewFormModal";
import ReviewDeleteModal from './ReviewDeleteModal';

export default function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user)
  const spot = useSelector(state => state.spots.singleSpot[spotId])
  const reviews = useSelector(state => state.reviews.spots[spotId])
  const [spotImages, setSpotImages] = useState(null)
  const [numReviews, setNumReviews] = useState(0)
  const [avgStarRating, setAvgStarRating] = useState(0)

  const [loaded, setLoaded] = useState(false)
  const [loaded2, setLoaded2] = useState(false)

  //initial Fetch
  useEffect(() => {
    dispatch(fetchOneSpot(spotId))
    setLoaded(true)
  }, [dispatch, spotId])

  useEffect(() => {
    if (spot && loaded && spot.numReviews > 0) {
      dispatch(fetchReviews(spotId))
    }
    setLoaded2(true)
  }, [dispatch, loaded, spotId])

  useEffect(() => {
    if (spot && loaded && loaded2) {

      if (reviews) {
        setNumReviews(reviews.length)
      }

      if (reviews && reviews.length > 0) {
        let totalRating = 0;

        reviews.forEach(review => {
          totalRating += review.stars
        })
        let avg = (totalRating / reviews.length).toFixed(1)
        setAvgStarRating(avg)

      } else {
        setAvgStarRating("New")
      }
    }

  }, [dispatch, loaded, loaded2, spotId, spot])

  if (!loaded || !loaded2 || !spot || !spot.SpotImages) {
    return <div>
      LOADING!!!
    </div>
  }

  let previewImage = "";
  let allImages = []


  spot.SpotImages.forEach(image => {
    if (image.preview === true) {
      previewImage = image
    } else {
      allImages.push(image)
    }
  })

  if (!previewImage) {
    return <h1>grabbing images</h1>
  }

  return (
    <div className="spotDetails">
      <div className="topDetails">
        <h1>{spot.name}</h1>
        <h2>{spot.city}, {spot.state}, {spot.country}</h2>
      </div>

      <div className="imageDetails">
        {/* mental note B.W. */}
        <div className="mainImageDetails">
          {previewImage && <img id="image1" className="sideImages" src={previewImage.url} />}
        </div>

        <div className="sideImageDetails">
          {allImages[0] && <img id="image2" className="sideImages" src={allImages[0].url} />}
          {allImages[1] && <img id="image3" className="sideImages" src={allImages[1].url} />}
          {allImages[2] && <img id="image4" className="sideImages" src={allImages[2].url} />}
          {allImages[3] && <img id="image5" className="sideImages" src={allImages[3].url} />}
        </div>

      </div>

      <div className="descriptionDetails">

        <div className="actualDescription">
          <h1>Hosted by {spot.Owner.firstName}</h1>

          <p>{spot.description}</p>

        </div>

        <div className="reserveDiv">
          <div className="topReserve">
            <h1>${spot.price}<span id="NIGHT"> night</span></h1>
            <div className="rating-review">
              <i className="fa fa-star">
                {avgStarRating}
              </i>
              ·
              <div id="num-reviews">{numReviews} {numReviews === 1 ? 'review' : 'reviews'}</div>
            </div>
          </div>

          <button id="reserveButton" onClick={(e) => alert("Feature Coming Soon...")}>
            Reserve
          </button>

        </div>

      </div>

      <div className="reviewDetails">
        <h1>
          <i className="fa fa-star">{avgStarRating} · {numReviews} {numReviews === 1 ? 'review' : 'reviews'}</i>
        </h1>
        {currentUser && currentUser.id !== spot.Owner.id && !(reviews && reviews.find(review => review.userId === currentUser.id)) &&
          <OpenModalReview
            itemText="Post Your Review"
            modalComponent={<ReviewFormModal spotId={spotId} />}
          />}
        <ul className="reviewList">
          {reviews && reviews.map((loopReview, index) => {
            let review = reviews[reviews.length - (1 + index)]


            let reviewDate = new Date(review.createdAt).toLocaleString('en-US', { month: 'long', year: "numeric" })
            return (
              <li key={review.id} className="reviewListItem">
                <div id="reviewName">{review.User.firstName} {review.User.lastName}</div>
                <div id="reviewDate">{reviewDate}</div>
                <div id="reviewParagraph">{review.review}</div>
                {currentUser && review.userId === currentUser.id &&
                  <OpenModalReview
                    itemText="Delete"
                    modalComponent={<ReviewDeleteModal review={review} spot={spot} />}
                  />}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
