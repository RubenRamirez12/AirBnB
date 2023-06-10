import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import './SpotUpdateModal.css'
import { fetchOneSpot, getCurrentUserSpots, spotCreator } from '../../store/spots'
import { useHistory } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { spotUpdator } from "../../store/spots";

export default function SpotUpdateForm() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { spotId } = useParams();
	const spot = useSelector(state => state.spots.singleSpot[spotId])

	const [country, setCountry] = useState("");
	const [streetAddress, setStreetAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [latitude, setLatitude] = useState(100);
	const [longitude, setLongitude] = useState(100);
	const [description, setDescription] = useState("")
	const [title, setTitle] = useState("")
	const [price, setPrice] = useState("")

	const [photo1, setPhoto1] = useState("")
	const [photo2, setPhoto2] = useState("")
	const [photo3, setPhoto3] = useState("")
	const [photo4, setPhoto4] = useState("")
	const [photo5, setPhoto5] = useState("")

	const [photoIds, setPhotoIds] = useState([])

	const [checkedVal, setCheckedVal] = useState(false)
	const [errors, setErrors] = useState({});

	useEffect(() => {
		dispatch(fetchOneSpot(spotId))
	}, [dispatch, spotId])

	useEffect(() => {

		if (spot && spot.SpotImages) {
			setCountry(spot.country)
			setStreetAddress(spot.address)
			setCity(spot.city)
			setState(spot.state)
			setLongitude(spot.lng)
			setLatitude(spot.latitude)
			setDescription(spot.description)
			setTitle(spot.name)
			setPrice(spot.price)


			let allIds = [];

			let previewImage = spot.SpotImages.find(image => image.preview === true)

			setPhoto1(previewImage.url)
			allIds.push(previewImage.id)

			let normalImages = []

			spot.SpotImages.forEach(image => {
				if (image.preview === false) {
					normalImages.push(image)
				}
			})

			for (let i = 0; i < normalImages.length; i++) {
				let currentImage = normalImages[i]

				if (i === 0) {
					setPhoto2(currentImage.url)
				}

				if (i === 1) {
					setPhoto3(currentImage.url)
				}

				if (i === 2) {
					setPhoto4(currentImage.url)
				}

				if (i === 3) {
					setPhoto5(currentImage.url)
				}

				allIds.push(currentImage.id)
			}

			setPhotoIds(allIds)
		}

	}, [dispatch, spot, spotId])


	useEffect(() => {
		let errorObj = {}

		if (!country) {
			errorObj.country = 'Country is required'
		}

		if (!streetAddress) {
			errorObj.address = "Address is required"
		}

		if (!city) {
			errorObj.city = 'City is required'
		}

		if (!state) {
			errorObj.state = 'State is required'
		}

		if (description.length < 30) {
			errorObj.description = 'Description needs a minimum of 30 characters'
		}

		if (description.length > 255) {
			errorObj.description = "Description needs to be shorter than 255 characters"
		}

		if (!title) {
			errorObj.name = 'Name is required'
		}

		if (!price) {
			errorObj.price = 'Price is required'
		}

		if (!photo1) {
			errorObj.photo1 = "Preview Image is required"
		}

		if (photo1 && !["png", "jpg", "jpeg"].includes(photo1.split(".")[photo1.split('.').length - 1])) {
			errorObj.photo1 = "Image URL must end in .png, .jpg, or .jpeg"
		}

		if (photo2 && !["png", "jpg", "jpeg"].includes(photo2.split(".")[photo2.split('.').length - 1])) {
			errorObj.photo2 = "Image URL must end in .png, .jpg, or .jpeg"
		}

		if (photo3 && !["png", "jpg", "jpeg"].includes(photo3.split(".")[photo3.split('.').length - 1])) {
			errorObj.photo3 = "Image URL must end in .png, .jpg, or .jpeg"
		}

		if (photo4 && !["png", "jpg", "jpeg"].includes(photo4.split(".")[photo4.split('.').length - 1])) {
			errorObj.photo4 = "Image URL must end in .png, .jpg, or .jpeg"
		}

		if (photo5 && !["png", "jpg", "jpeg"].includes(photo5.split(".")[photo5.split('.').length - 1])) {
			errorObj.photo5 = "Image URL must end in .png, .jpg, or .jpeg"
		}

		setErrors(errorObj)
	}, [country, streetAddress, city, state, description, title, price, photo1, photo2, photo3, photo4, photo5])

	const handleSubmit = async (e) => {
		e.preventDefault();
		setCheckedVal(true)

		if (Object.values(errors).length === 0) {
			let errors = null
			dispatch(spotUpdator({
				spotId,
				address: streetAddress,
				city,
				state,
				country,
				lat: latitude,
				lng: longitude,
				name: title,
				description,
				price,
				photos: [photo1, photo2, photo3, photo4, photo5],
				photoIds,
				avgRating: spot.avgStarRating
			}))
				.catch(error => errors = error)


			if (errors) {
				console.log(errors)
			} else {
				setTimeout(() => {
					history.push(`/spots/${spotId}`)
				}, 500)
			}
		}

	}

	if (!spot || !photo1) {
		return (
			<h1>fixing</h1>
		)
	}

	return (
		<div className="spotUpdate">
			<form className="spotUpdateForm">

				<div className="SU-topForm">
					<h1>Update your Spot</h1>
					<h3>Where's your place located?</h3>
					<p>Guests will only get your exact address once they booked a reservation.</p>
				</div>



				<div id="SU-Row1">
					<div className="section-heading">
						Country
						{checkedVal && errors.country && <p className="spot-update-errors">{errors.country}</p>}
					</div>
					<input
						type="text"
						value={country}
						onChange={(e) => setCountry(e.target.value)}
						required
						placeholder="Country"
					/>
				</div>






				<div id="SU-Row2">

					<div className="section-heading">
						Street Address
						{checkedVal && errors.address && <p className="spot-update-errors">{errors.address}</p>}
					</div>

					<input
						type="text"
						onChange={(e) => setStreetAddress(e.target.value)}
						value={streetAddress}
						required
						placeholder="Address"
					/>
				</div>





				<div id="SU-Row3">

					<div id="R3-C1">
						<div className="section-heading">
							City
							{checkedVal && errors.city && <p className="spot-update-errors">{errors.city}</p>}
						</div>
						<input
							type="text"
							value={city}
							onChange={(e) => setCity(e.target.value)}
							required
							placeholder="City"
						/>
					</div>

					<div id="R3-C2">
						<div className="section-heading">
							State
							{checkedVal && errors.state && <p className="spot-update-errors">{errors.state}</p>}
						</div>
						<input
							type="text"
							onChange={(e) => setState(e.target.value)}
							value={state}
							required
							placeholder="STATE"
						/>
					</div>

				</div>







				<div id="SU-Description">
					<h2>Describe your place to guests</h2>
					<p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
					<textarea
						id="description-area"
						onChange={(e) => setDescription(e.target.value)}
						value={description}
						required
						placeholder="Please write at least 30 characters"
					/>
					{checkedVal && errors.description && <p className="spot-update-errors">{errors.description}</p>}
				</div>




				<div id="SU-Title">
					<h1>Create a title for your spot</h1>
					<p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
					<input
						type="text"
						onChange={(e) => setTitle(e.target.value)}
						value={title}
						required
						placeholder="Name of your spot"
					/>
					{checkedVal && errors.name && <p className="spot-update-errors">{errors.name}</p>}
				</div>




				<div id="SU-Price">

					<h1>Set a base price for your spot</h1>
					<p>Competitive pricing can help your listing stand out and rank higher in search results.</p>

					<div id="inside-SU-Price">
						$
						<input
							type="number"
							step={"0.01"}
							onChange={(e) => setPrice(e.target.value)}
							value={price}
							min="1"
							required
							placeholder="Price per night (USD)"
						/>
					</div>
					{checkedVal && errors.price && <p className="spot-update-errors">{errors.price}</p>}
				</div>





				<div id="SU-Images">
					<h1>Liven up your spot with photos</h1>
					<p>Submit a link to atleast one photo to publish your spot</p>
					<div id="inside-SU-Images">
						<div>

							<input
								type="url"
								onChange={(e) => setPhoto1(e.target.value)}
								required
								placeholder="Preview Image URL"
								value={photo1}
							/>
							{checkedVal && errors.photo1 && <p className="spot-update-errors">{errors.photo1}</p>}
						</div>

						<div>
							<input
								type="url"
								onChange={(e) => setPhoto2(e.target.value)}
								placeholder="Image URL"
								value={photo2}
							/>
							{checkedVal && errors.photo2 && <p className="spot-update-errors">{errors.photo2}</p>}
						</div>

						<div>
							<input
								type="url"
								onChange={(e) => setPhoto3(e.target.value)}
								placeholder="Image URL"
								value={photo3}
							/>
							{checkedVal && errors.photo3 && <p className="spot-update-errors">{errors.photo3}</p>}
						</div>

						<div>
							<input
								type="url"
								onChange={(e) => setPhoto4(e.target.value)}
								placeholder="Image URL"
								value={photo4}
							/>
							{checkedVal && errors.photo4 && <p className="spot-update-errors">{errors.photo4}</p>}
						</div>

						<div>
							<input
								type="url"
								onChange={(e) => setPhoto5(e.target.value)}
								placeholder="Image URL"
								value={photo5}
							/>
						</div>
						{checkedVal && errors.photo5 && <p className="spot-update-errors">{errors.photo5}</p>}
					</div>

				</div>

				<div id="SU-button-Div">
					<button type="submit" id="SU-submit-button"
						disabled={checkedVal === true && Object.values(errors).length > 0}
						onClick={handleSubmit}>Update Spot</button>
				</div>

			</form>
		</div>
	)
}
