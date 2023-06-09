import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { spotDelete } from "../../store/spots";
import './SpotDeleteModal.css'

export default function SpotDeleteModal({ spotId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();


    const spotDeletor = () => {
        dispatch(spotDelete(spotId))
        closeModal()
    }

    return (
        <div className="Delete-Spot">
            <div id="delete-Spot-top">
                <h1 id="confirm-delete">Confirm Delete</h1>
                <p>Are you sure you want to remove this spot from the listings?</p>
            </div>
            <div className="Spot-edit-buttons">
                <button
                    className="Buttons-in-delete"
                    id="confirm-delete-button"
                    onClick={() => spotDeletor()}
                >Yes (Delete Spot)</button>
                <button
                    className="Buttons-in-delete"
                    id="confirm-keep-button"
                    onClick={() => closeModal()}
                >No (Keep Spot)</button>
            </div>
        </div>
    )
}
