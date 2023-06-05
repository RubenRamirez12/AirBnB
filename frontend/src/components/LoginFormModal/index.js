import React, { useState } from "react";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

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
          {errors.credential && <p className="login-errors">{errors.credential}</p>}
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

        <button id="LoginModalButton" type="submit">Log In</button>

      </form>



      <div className="DemoDiv">


        <button className="demoUserButton" onClick={() => {
          dispatch(sessionActions.login({ credential: "Demo1", password:"Demo123" }))
          .then(closeModal)
        }}>Demo User 1</button>


        <button className="demoUserButton" onClick={() => {
          dispatch(sessionActions.login({ credential: "Demo2", password:"Demo123" }))
          .then(closeModal)
        }}>Demo User 2</button>


      </div>


    </div>



  );
}

export default LoginFormModal;
