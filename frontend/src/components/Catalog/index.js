import { useEffect, useState } from "react"
import SpotCard from "./SpotCard"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllSpots } from "../../store/spots"
import './Catalog.css'

export default function Catalog() {
    const dispatch = useDispatch()
    const spots = useSelector(state => Object.values(state.spots.allSpots));

    useEffect(() => {
        dispatch(fetchAllSpots())
    }, [dispatch])

    return (
        <div className="catalogDiv">
            {spots && spots.map(spot => {
                console.log(spot)
                return (
                    <div className="spotCard">
                        <SpotCard spot={spot} />
                    </div>
                )
            })}
        </div>
    )
}
