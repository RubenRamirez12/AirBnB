import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [checkedval, setCheckedVal] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    setCheckedVal(true)

    if (Object.values(errors).length === 0) {
      return dispatch(sessionActions.login({ credential, password }))
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
    let tempErrors = {}
    if (credential.length < 4 || password.length < 6) {
      tempErrors.credential = "The provided credentials were invalid"
    }

    setErrors(tempErrors)
  },[credential,password])

  return (
    <div className="Login">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="LoginForm">

        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
          {checkedval && errors.credential && <p className="login-errors">{errors.credential}</p>}
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button id="LoginModalButton" type="submit"
        disabled={checkedval === true && Object.values(errors).length > 0}
        >Log In</button>

      </form>



      <div className="DemoDiv">


        <button className="demoUserButton" onClick={() => {
          dispatch(sessionActions.login({ credential: "Demo1", password: "Demo123" }))
            .then(closeModal)
        }}>Demo User 1</button>


        <button className="demoUserButton" onClick={() => {
          dispatch(sessionActions.login({ credential: "Demo2", password: "Demo123" }))
            .then(closeModal)
        }}>Demo User 2</button>


      </div>


    </div>



  );
}

export default LoginFormModal;
