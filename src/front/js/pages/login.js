import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";

const Login = () => {
  const { store, actions } = useContext(Context);

  const handleInputChange = (e) => {
    actions.handleChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.login();
  };

  return (
    <div className="container text-center">
      <h1 className="mt-5 mb-5">Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="text-center"
            name="email"
            placeholder="email"
            value={store.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="mt-5">
          <input
            className="text-center"
            name="password"
            type="password"
            placeholder="password"
            value={store.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="radio-group mt-4">
          <label>
            Client
            <input
              className="client"
              type="radio"
              name="userType"
              value="client"
              checked={store.userType === "client"}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Artist
            <input
              className="artist"
              type="radio"
              name="userType"
              value="artist"
              checked={store.userType === "artist"}
              onChange={handleInputChange}
            />
          </label>
        </div>

        <div>
          <button className="mt-5 mb-5" type="submit">
            Go
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
