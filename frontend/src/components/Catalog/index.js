import { useEffect, useState } from "react"
import SpotCard from "./SpotCard"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllSpots } from "../../store/spots"
import './Catalog.css'

export default function Catalog() {
    const dispatch = useDispatch()
    const spots = useSelector(state => Object.values(state.spots.allSpots));
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        dispatch(fetchAllSpots())
        setLoaded(true)
    }, [dispatch])


    if (loaded === false) {
        return (
            <h1>loading!</h1>
        )
    }


    return (
        <div className="catalogDiv">
            {spots && spots.map(spot => {
                return (
                    <div key={spot.id} className="spotCard">
                        <SpotCard spot={spot} />
                    </div>
                )
            })}
        </div>
    )
}
