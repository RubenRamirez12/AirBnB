import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './ReviewFormModal.css'
import { reviewCreator } from "../../store/reviews";
export default function ReviewFormModal({ spotId }) {
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const [starHovering, setStarHovering] = useState(0)
	const [checkedVal, setCheckedVal] = useState(false)


	const [description, setDescription] = useState("");
	const [stars, setStars] = useState(0);

	const [errors, setErrors] = useState({});


	let starArray = [1, 2, 3, 4, 5]

	const handleSubmit = (e) => {
		e.preventDefault();
		setCheckedVal(true)

		if (Object.values(errors).length === 0) {
			dispatch(reviewCreator({
				spotId,
				review: description,
				stars
			}))
			closeModal();
		}

	};

	useEffect(() => {
		let tempErrors = {};

		if (stars < 1) {
			tempErrors.stars = "Please select your rating"
		}

		if (description.length < 10) {
			tempErrors.description = "Please write atleast 10 characters"
		}

		setErrors(tempErrors)
	}, [stars, description])


	return (
		<div className="Create-Review">

			<h1>How was your stay?</h1>

			<form onSubmit={handleSubmit} className="ReviewForm">

				<textarea
					id="ReviewDescription"
					placeholder="Leave your review here..."
					required
					onChange={(e) => setDescription(e.target.value)}
				/>
				{checkedVal && errors.description && <p className="review-creation-errors">{errors.description}</p>}

				<div id="star-selector">
					{starArray.map(starKey => {
						//click selected active
						//hover active
						//mouse excit set hover to star norm
						//removes active from all non selected.
						return (
							<i
								key={starKey}
								className={`fa fa-star ${starKey <= stars ? 'selected-star' : ''} ${starKey <= starHovering ? 'hovered-star' : ''}`}
								onMouseEnter={() => setStarHovering(starKey)}
								onMouseLeave={() => setStarHovering(stars)}
								onClick={() => setStars(starKey)}
							/>
						)
					})}
					Stars
				</div>
				{checkedVal && errors.stars && <p className="review-creation-errors">{errors.stars}</p>}

				<button
				id="ReviewModalButton"
				type="submit"
				disabled={checkedVal === true && Object.values(errors).length > 0}
				>Submit Your Review</button>

			</form>
		</div>



	);
}
