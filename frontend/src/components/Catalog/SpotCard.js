import { Link } from "react-router-dom";
import './SpotCard.css'
export default function SpotCard({ spot }) {
    return (
        <div className="wholeSpot">
            <Link className="ImageLink" to={`/spots/${spot.ids}`}>
                {/* make sure to replace src after testing with spot.previewImage */}
                {console.log("Reminder to Check SpotCard")}
                <img className="spotImage" src="https://media.istockphoto.com/id/955765580/photo/palm-tree-in-beach-in-tropical-island-caribbean-guadalupe.jpg?s=2048x2048&w=is&k=20&c=fzpVbZluvv_jcZK4PmRuPZaRDr2lhSkEOfYxxpWPIlY=" />
            </Link>
            <div className="spotInfo">
                <div id="topInfo">
                    <Link to={`/spots/${spot.ids}`} id="topLeftInfo">
                        {spot.city}, {spot.state}
                    </Link>
                    <Link to={`/spots/${spot.ids}`} id="topRightInfo">
                        <i className="fas fa-star">{spot.avgRating}</i>
                    </Link>
                </div>
                <Link to={`/spots/${spot.ids}`} id="bottomInfo">
                    <div id='price'>${spot.price}  </div> night
                </Link>
            </div>

        </div >
    )
}
