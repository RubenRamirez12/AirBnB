import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [checkedVal, setCheckedVal] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    setCheckedVal(true)

    if (Object.values(errors)) {
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }

  };

  useEffect(() => {
    let tempErrors = {};

    if (!email) {
      tempErrors.email = "Please fill out this field"
    }


    if (!username) {
      tempErrors.username = "Please fill out this field"
    }

    if (username && username.length < 4) {
      tempErrors.username = "Please provide a username with at least 4 characters."
    }

    if (!firstName) {
      tempErrors.firstName = "Please fill out this field"
    }

    if (!lastName) {
      tempErrors.lastName = "Please fill out this field"
    }

    if (!password) {
      tempErrors.password = "please fill out this field"
    }

    if (password && (!confirmPassword || password !== confirmPassword)) {
      tempErrors.password = "Confirm Password field must be the same as the Password field"
    }

    if (password && password.length < 6) {
      tempErrors.password = "Password must be 6 characters or more."
    }

    setErrors(tempErrors)

  }, [email, username, firstName, lastName, password, confirmPassword])

  return (
    <div className="Signup">
      <h1>Sign Up</h1>
      <form className="SignupForm" onSubmit={handleSubmit}>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {checkedVal && errors.email && <p className="signup-errors">{errors.email}</p>}
        </label>

        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {checkedVal && errors.username && <p className="signup-errors">{errors.username}</p>}
        </label>

        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          {checkedVal && errors.firstName && <p className="signup-errors">{errors.firstName}</p>}
        </label>

        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          {checkedVal && errors.lastName && <p className="signup-errors">{errors.lastName}</p>}
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p className="signup-errors">{errors.password}</p>}
        </label>

        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && (<p children className="signup-errors">{errors.confirmPassword}</p>)}
        </label>

        <button className="SignupModalButton" type="submit" disabled={checkedVal === true && Object.values(errors).length > 0}>Sign Up</button>

      </form>
    </div>
  );
}

export default SignupFormModal;
