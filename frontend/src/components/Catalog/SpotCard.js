import { Link } from "react-router-dom";
import './SpotCard.css'



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
                        <i className="fas fa-star">
                            {spot.avgRating === "No reviews yet" ? "New" : typeof spot.avgRating === 'number' && spot.avgRating.toFixed(1)}
                        </i>
                    </Link>

                </div>

                <Link to={`/spots/${spot.id}`} id="bottomInfo">
                    <div id='price'>${typeof spot.price === 'number' && spot.price.toFixed(2)}</div> night
                </Link>

            </div>

        </div >
    )
}
