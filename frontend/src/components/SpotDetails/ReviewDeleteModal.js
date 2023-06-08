import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './ReviewDeleteModal.css'
import { DeleteAReview } from "../../store/reviews";

export default function ReviewDeleteModal({ review, spot }) {

    const dispatch = useDispatch();
    const { closeModal } = useModal();


    const reviewDeletor = () => {
        dispatch(DeleteAReview({
            reviewId: review.id,
            spotId: spot.id
        }))
        
        closeModal()
    }


    return (
        <div className="Delete-Review">
            <div id="delete-review-top">
                <h1 id="confirm-delete">Confirm Delete</h1>
                <p>Are you sure you want to delete this review?</p>
            </div>
            <div className="review-edit-buttons">
                <button
                    className="Buttons-in-delete"
                    id="confirm-delete-button"
                    onClick={() => reviewDeletor()}
                >Yes (Delete Review)</button>
                <button
                    className="Buttons-in-delete"
                    id="confirm-keep-button"
                    onClick={() => closeModal()}
                >No (Keep Review)</button>
            </div>
        </div>
    );
}
