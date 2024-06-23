import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const Login = () => {
  const { store, actions } = useContext(Context);
  const [user, setUser] = useState({ email: "", password: "", userType: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actions.login(user);
    localStorage.token?(navigate("/")):alert("Usuario o contraseña incorrecto")
    
  };

  return (
    <div className="container text-center">
      <h1 className="mt-5 mb-5">Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="text-center email"
            name="email"
            placeholder="email"
            value={user.email}
            onChange={(event) => setUser({ ...user, email: event.target.value })}
          />
        </div>

        <div className="mt-5 position-relative password-wrapper">
          <input
            className="text-center password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            value={user.password}
            onChange={(event) => setUser({ ...user, password: event.target.value })}
          />
          <span
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"} {/* Ícono de ojo */}
          </span>
        </div>

        <div className="radio-group mt-4">
          <label>
            Artist
            <input
              className="artist"
              type="radio"
              name="userType"
              value="artist"
              onChange={(event) => setUser({ ...user, userType: event.target.value })}
            />
          </label>
          <label>
            Client
            <input
              className="client"
              type="radio"
              name="userType"
              value="client"
              onChange={(event) => setUser({ ...user, userType: event.target.value })}
            />
          </label>
        </div>

        <div>
          <button className="mt-5 go" type="submit">
            Login
          </button>
          <Link to="/register"><p className="mt-5">¡Register here!</p></Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
