import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getCurrentUserSpots } from "../../store/spots"
import SpotCard from '../Catalog/SpotCard'
import './SpotsCurrent.css'
import OpenModalReview from "../SpotDetails/OpenModalReview";
import SpotDeleteModal from "../UserSpotOptionsModal/SpotDeleteModal"
import SpotUpdateModal from "../UserSpotOptionsModal/SpotUpdateForm"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

export default function SpotsCurrent() {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)
    const currentUserSpots = useSelector(state => Object.values(state.spots.userSpots))

    console.log(currentUserSpots)
    useEffect(() => {

        if (currentUser) {
            dispatch(getCurrentUserSpots())
        }

    }, [dispatch])


    if (!currentUser) {
        return (
            <h1>Please log in to a account</h1>
        )
    }

    return (
        <div className="userCatalogDiv">

            {currentUserSpots && currentUserSpots.map(spot => {
                return (
                    <div key={spot.id} className="userSpotCard">
                        <SpotCard spot={spot} />

                        <div className="spot-Options">

                            <Link to={`/spots/${spot.id}/edit`}>
                                <button id="update-spot-button">Update</button>
                            </Link>

                            <OpenModalReview
                                itemText="Delete"
                                modalComponent={<SpotDeleteModal spotId={spot.id} />}
                            />

                        </div>

                    </div>
                )
            })}

        </div>
    )
}
