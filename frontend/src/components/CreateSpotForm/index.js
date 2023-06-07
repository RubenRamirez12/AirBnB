import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import './CreateSpotForm.css'
import { spotCreator } from '../../store/spots'
import { useHistory } from 'react-router-dom'

export default function CreateSpotForm() {
  const dispatch = useDispatch();
  const history = useHistory()

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

  const [checkedVal, setCheckedVal] = useState(false)
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCheckedVal(true)

    if (Object.values(errors).length === 0) {
      let newSpot = await dispatch(spotCreator({
        address: streetAddress,
        city,
        state,
        country,
        lat: latitude,
        lng: longitude,
        name: title,
        description,
        price,
        photos: [photo1, photo2, photo3, photo4, photo5]
      }))

      history.push(`/spots/${newSpot.id}`)
    }

  }

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

  return (
    <div className="spotCreate">
      <form className="spotCreateForm">
        <div className="SC-topForm">
          <h1>Create a new Spot</h1>
          <h3>Where's your place located?</h3>
          <p>Guests will only get your exact address once they booked a reservation.</p>
        </div>

        <div id="SC-Row1">
          <div className="section-heading">
            Country
            {checkedVal && errors.country && <p className="spot-creation-errors">{errors.country}</p>}
          </div>
          <input
            type="text"
            onChange={(e) => setCountry(e.target.value)}
            required
            placeholder="Country"
          />
        </div>






        <div id="SC-Row2">

          <div className="section-heading">
            Street Address
            {checkedVal && errors.address && <p className="spot-creation-errors">{errors.address}</p>}
          </div>

          <input
            type="text"
            onChange={(e) => setStreetAddress(e.target.value)}
            required
            placeholder="Address"
          />
        </div>





        <div id="SC-Row3">

          <div id="R3-C1">
            <div className="section-heading">
              City
              {checkedVal && errors.city && <p className="spot-creation-errors">{errors.city}</p>}
            </div>
            <input
              type="text"
              onChange={(e) => setCity(e.target.value)}
              required
              placeholder="City"
            />
          </div>

          <div id="R3-C2">
            <div className="section-heading">
              State
              {checkedVal && errors.state && <p className="spot-creation-errors">{errors.state}</p>}
            </div>
            <input
              type="text"
              onChange={(e) => setState(e.target.value)}
              required
              placeholder="STATE"
            />
          </div>

        </div>







        <div id="SC-Description">
          <h2>Describe your place to guests</h2>
          <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
          <textarea
            id="description-area"
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Please write at least 30 characters"
          />
          {checkedVal && errors.description && <p className="spot-creation-errors">{errors.description}</p>}
        </div>




        <div id="SC-Title">
          <h1>Create a title for your spot</h1>
          <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Name of your spot"
          />
          {checkedVal && errors.name && <p className="spot-creation-errors">{errors.name}</p>}
        </div>




        <div id="SC-Price">

          <h1>Set a base price for your spot</h1>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>

          <div id="inside-SC-Price">
            $
            <input
              type="number"
              step={"0.01"}
              onChange={(e) => setPrice(e.target.value)}
              min="1"
              required
              placeholder="Price per night (USD)"
            />
          </div>
          {checkedVal && errors.price && <p className="spot-creation-errors">{errors.price}</p>}
        </div>





        <div id="SC-Images">
          <h1>Liven up your spot with photos</h1>
          <p>Submit a link to atleast one photo to publish your spot</p>
          <div id="inside-SC-Images">
            <div>

              <input
                type="url"
                onChange={(e) => setPhoto1(e.target.value)}
                required
                placeholder="Preview Image URL"
              />
              {checkedVal && errors.photo1 && <p className="spot-creation-errors">{errors.photo1}</p>}
            </div>

            <div>
              <input
                type="url"
                onChange={(e) => setPhoto2(e.target.value)}
                placeholder="Image URL"
              />
              {checkedVal && errors.photo2 && <p className="spot-creation-errors">{errors.photo2}</p>}
            </div>

            <div>
              <input
                type="url"
                onChange={(e) => setPhoto3(e.target.value)}
                placeholder="Image URL"
              />
              {checkedVal && errors.photo3 && <p className="spot-creation-errors">{errors.photo3}</p>}
            </div>

            <div>
              <input
                type="url"
                onChange={(e) => setPhoto4(e.target.value)}
                placeholder="Image URL"
              />
              {checkedVal && errors.photo4 && <p className="spot-creation-errors">{errors.photo4}</p>}
            </div>

            <div>
              <input
                type="url"
                onChange={(e) => setPhoto5(e.target.value)}
                placeholder="Image URL"
              />
            </div>
            {checkedVal && errors.photo5 && <p className="spot-creation-errors">{errors.photo5}</p>}
          </div>

        </div>

        <div id="SC-button-Div">
          <button type="submit" id="SC-submit-button"
            disabled={checkedVal === true && Object.values(errors).length > 0}
            onClick={handleSubmit}>Create Spot</button>
        </div>

      </form>
    </div>
  )
}


/*
checking if button is disabled:
if either are true it disables
disabled {
  if (
    checkedValidation === true
    &&
    checkedValidation === false
}


if
*/
