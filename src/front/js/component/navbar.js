import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <img src="/workspaces/spain-fs-pt-63-CW-DY-MS-VS/public/PIXELARTE (2).png"/>
    
        <button className="navbar-toggler mt-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/galeria">Galeria</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/perfil">Perfil</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Menú
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item" to="/">Home</Link></li>
                <li><Link className="dropdown-item" to="/galeria">Galeria</Link></li>
                <li><Link className="dropdown-item" to="/perfil">Perfil</Link></li>
              </ul>
            </li>
          </ul>
          <form className="d-flex ms-auto mt-2" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Login</button>
          </form>
        </div>
      </div>
    </nav>
  );
};
