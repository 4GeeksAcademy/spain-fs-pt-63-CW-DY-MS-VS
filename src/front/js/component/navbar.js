import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { IoFlowerOutline } from "react-icons/io5";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const token = localStorage.getItem("token")
  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <nav className="navbar navbar-dark navbar-expand-lg  bg-body-tertiary">
      <div className="container-fluid">
        <IoFlowerOutline />
        <button className="navbar-toggler mt-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/galery">Galery</Link>
            </li>
            {token ? (<li className="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link>
            </li>) : null}
          </ul>
        </div>
        <div className="d-flex float-end">
          {
            token ? (<p className="px-2">Hi, {userData?.first_name}</p>) : null
          }
          {
            token && userData.type === "client" ? (<Link to="/shopping"><span className="px-2"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
            </svg></span>
            </Link>
            ) : (null)
          }

          {
            token ? (
              <Link to="/"><button className="btn btn-outline-light" onClick={actions.deleteToken}>Logout</button></Link>

            ) : (
              <Link className="login " to="/login">
                <button className="btn btn-outline-light " type="submit">Login</button>
              </Link>)
          }
        </div>
      </div>
    </nav>
  );
};