/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch } from "react-redux";

import "./index.css";
import { authActions } from "../../store/auth";

import axios from "axios";
import { fetchApi } from "../../utilities/fetch";

const Auth = () => {
  const dispatch = useDispatch();

  const [isSignUp, setIsSignUp] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(false);

  const loginHandler = async (event) => {
    event.preventDefault();
    const x = fetchApi("auth/login", "post", {
      username: username,
      password: password,
    });

    setUserName("");
    setPassword("");
    localStorage.setItem("token", (await x).data.token);
    dispatch(authActions.login());
  };

  const signUpHandler = (event) => {
    event.preventDefault();

    fetchApi("auth/register", "post", {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      isAdmin: role,
    });
    setUserName("");
    setPassword("");
  };

  const toggleSignUpHandler = () => {
    setIsSignUp((prevState) => !prevState);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div className={"auth"}>
      <form onSubmit={isSignUp ? signUpHandler : loginHandler}>
        {isSignUp ? (
          <>
            <input
              placeholder="First Name"
              value={firstName}
              onChange={handleFirstNameChange}
            />
            <input
              placeholder="Last Name"
              value={lastName}
              onChange={handleLastNameChange}
            />
            <input
              placeholder="username"
              value={username}
              onChange={handleEmailChange}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <div>
              <label>
                <input
                  type="radio"
                  name="role"
                  value={false}
                  onChange={handleRoleChange}
                />
                User
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value={true}
                  onChange={handleRoleChange}
                />
                Admin
              </label>
            </div>
            <button>Sign Up</button>
            <p>
              Already have an account?
              <a href="#" onClick={toggleSignUpHandler}>
                Sign In
              </a>
            </p>
          </>
        ) : (
          <>
            <input
              placeholder="username"
              value={username}
              onChange={handleEmailChange}
            />

            <input
              placeholder="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button>Login</button>

            <p>
              {`Don't have an account?`}
              <a href="#" onClick={toggleSignUpHandler}>
                Sign Up
              </a>
            </p>
          </>
        )}
      </form>
    </div>
  );
};
export default Auth;
