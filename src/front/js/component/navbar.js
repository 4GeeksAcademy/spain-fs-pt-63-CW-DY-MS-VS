import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { IoFlowerOutline } from "react-icons/io5";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const token = localStorage.getItem("token")
  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <IoFlowerOutline />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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
          <form className="d-flex ms-auto mt-2" role="search">
            <Link className="login" to="/login"><button className="btn btn-outline-success" type="submit">Login</button></Link>
          </form>
        </div>
      </div>
    </nav>
  );
};
