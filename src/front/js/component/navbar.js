import React from "react";
import { Link } from "react-router-dom";
import { IoFlowerOutline } from "react-icons/io5";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-body-tertiary">
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
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link>
            </li>
          </ul>
          <form className="d-flex ms-auto mt-2" role="search">
            <Link className="login" to="/login"><button className="btn btn-outline-light" type="submit">Login</button></Link>
          </form>
        </div>
      </div>
    </nav>
  );
};
