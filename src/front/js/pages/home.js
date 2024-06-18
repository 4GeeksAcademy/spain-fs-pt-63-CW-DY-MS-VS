import React, { useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  
  if(store.token){
    console.log ("ya existe el token") 
  }else console.log("no hay token")
  
  return (
    <div className="text-center mt-5">
      <div className="row frase mb-3 mt-1">
        <div className="col-sm-12">
          <p>
            "Encuentra la belleza en cada detalle con nuestras imágenes
            profesionales."
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <form action="/search" method="get">
            <div className="autocomplete">
              <input
                id="search-input"
                type="text"
                name="query"
                placeholder="Buscar..."
              />
            </div>
            <button className="buscar" type="submit">
              Buscar
            </button>
          </form>
        </div>
      </div>
      <div className="row mb-4 mt-4">
        <div className="col-sm-12">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner p-4">
              <div className="carousel-item active">
                <div className="row">
                  <div className="col-md-6 col-sm-12 col-xl-4 p-4">
                    <div className="card" style={{ width: "2 rem" }}>
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.nvRs6Egs-U4XBijZZmPUHAHaDt&pid=Api&P=0&h=180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <p className="card-text">Bailarina</p>
                        <p>Precio</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 col-xl-4 mt-4">
                    {" "}
                    <div className="card" style={{ width: "2 rem" }}>
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.nvRs6Egs-U4XBijZZmPUHAHaDt&pid=Api&P=0&h=180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <p className="card-text">Bailarina</p>
                        <p>Precio</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 col-xl-4 mt-4">
                    {" "}
                    <div className="card" style={{ width: "2 rem" }}>
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.nvRs6Egs-U4XBijZZmPUHAHaDt&pid=Api&P=0&h=180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <p className="card-text">Bailarina</p>
                        <p>Precio</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-sm-12 col-xl-4 mt-4">
                    {" "}
                    <div className="card" style={{ width: "2 rem" }}>
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.nvRs6Egs-U4XBijZZmPUHAHaDt&pid=Api&P=0&h=180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <p className="card-text">Bailarina</p>
                        <p>Precio</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 col-xl-4 mt-4">
                    <div className="card" style={{ width: "2 rem" }}>
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.nvRs6Egs-U4XBijZZmPUHAHaDt&pid=Api&P=0&h=180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <p className="card-text">Bailarina</p>
                        <p>Precio</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 col-xl-4 mt-4">
                    <div className="card" style={{ width: "2 rem" }}>
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.nvRs6Egs-U4XBijZZmPUHAHaDt&pid=Api&P=0&h=180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <p className="card-text">Bailarina</p>
                        <p>Precio</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-sm-12 col-xl-4 mt-4">
                    {" "}
                    <div className="card" style={{ width: "2 rem" }}>
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.nvRs6Egs-U4XBijZZmPUHAHaDt&pid=Api&P=0&h=180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <p className="card-text">Bailarina</p>
                        <p>Precio</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 col-xl-4 mt-4">
                    <div className="card" style={{ width: "2 rem" }}>
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.nvRs6Egs-U4XBijZZmPUHAHaDt&pid=Api&P=0&h=180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <p className="card-text">Bailarina</p>
                        <p>Precio</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 col-xl-4 mt-4">
                    {" "}
                    <div className="card" style={{ width: "2 rem" }}>
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.nvRs6Egs-U4XBijZZmPUHAHaDt&pid=Api&P=0&h=180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <p className="card-text">Bailarina</p>
                        <p>Precio</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row">
                  <div className="col-md-6 col-sm-12 col-xl-4 p-4">
                    <div className="card" style={{ width: "2 rem" }}>
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.nvRs6Egs-U4XBijZZmPUHAHaDt&pid=Api&P=0&h=180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <p className="card-text">Bailarina</p>
                        <p>Precio</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 col-xl-4 mt-4">
                    {" "}
                    <div className="card" style={{ width: "2 rem" }}>
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.nvRs6Egs-U4XBijZZmPUHAHaDt&pid=Api&P=0&h=180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <p className="card-text">Bailarina</p>
                        <p>Precio</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 col-xl-4 mt-4">
                    {" "}
                    <div className="card" style={{ width: "2 rem" }}>
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.nvRs6Egs-U4XBijZZmPUHAHaDt&pid=Api&P=0&h=180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <p className="card-text">Bailarina</p>
                        <p>Precio</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-sm-12 col-xl-4 mt-4">
                    {" "}
                    <div className="card" style={{ width: "2 rem" }}>
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.nvRs6Egs-U4XBijZZmPUHAHaDt&pid=Api&P=0&h=180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <p className="card-text">Bailarina</p>
                        <p>Precio</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 col-xl-4 mt-4">
                    <div className="card" style={{ width: "2 rem" }}>
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.nvRs6Egs-U4XBijZZmPUHAHaDt&pid=Api&P=0&h=180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <p className="card-text">Bailarina</p>
                        <p>Precio</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 col-xl-4 mt-4">
                    <div className="card" style={{ width: "2 rem" }}>
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.nvRs6Egs-U4XBijZZmPUHAHaDt&pid=Api&P=0&h=180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <p className="card-text">Bailarina</p>
                        <p>Precio</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-sm-12 col-xl-4 mt-4">
                    {" "}
                    <div className="card" style={{ width: "2 rem" }}>
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.nvRs6Egs-U4XBijZZmPUHAHaDt&pid=Api&P=0&h=180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <p className="card-text">Bailarina</p>
                        <p>Precio</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 col-xl-4 mt-4">
                    <div className="card" style={{ width: "2 rem" }}>
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.nvRs6Egs-U4XBijZZmPUHAHaDt&pid=Api&P=0&h=180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <p className="card-text">Bailarina</p>
                        <p>Precio</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 col-xl-4 mt-4">
                    {" "}
                    <div className="card" style={{ width: "2 rem" }}>
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.nvRs6Egs-U4XBijZZmPUHAHaDt&pid=Api&P=0&h=180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <p className="card-text">Bailarina</p>
                        <p>Precio</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row">
                  <div className="col-md-6 col-sm-12 col-xl-4 p-4">
                    <div className="card" style={{ width: "2 rem" }}>
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.nvRs6Egs-U4XBijZZmPUHAHaDt&pid=Api&P=0&h=180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <p className="card-text">Bailarina</p>
                        <p>Precio</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 col-xl-4 mt-4">
                    {" "}
                    <div className="card" style={{ width: "2 rem" }}>
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.nvRs6Egs-U4XBijZZmPUHAHaDt&pid=Api&P=0&h=180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <p className="card-text">Bailarina</p>
                        <p>Precio</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 col-xl-4 mt-4">
                    {" "}
                    <div className="card" style={{ width: "2 rem" }}>
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.nvRs6Egs-U4XBijZZmPUHAHaDt&pid=Api&P=0&h=180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <p className="card-text">Bailarina</p>
                        <p>Precio</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-sm-12 col-xl-4 mt-4">
                    {" "}
                    <div className="card" style={{ width: "2 rem" }}>
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.nvRs6Egs-U4XBijZZmPUHAHaDt&pid=Api&P=0&h=180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <p className="card-text">Bailarina</p>
                        <p>Precio</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 col-xl-4 mt-4">
                    <div className="card" style={{ width: "2 rem" }}>
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.nvRs6Egs-U4XBijZZmPUHAHaDt&pid=Api&P=0&h=180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <p className="card-text">Bailarina</p>
                        <p>Precio</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 col-xl-4  mt-4">
                    <div className="card" style={{ width: "2 rem" }}>
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.nvRs6Egs-U4XBijZZmPUHAHaDt&pid=Api&P=0&h=180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <p className="card-text">Bailarina</p>
                        <p>Precio</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-sm-12 col-xl-4 mt-4">
                    {" "}
                    <div className="card" style={{ width: "2 rem" }}>
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.nvRs6Egs-U4XBijZZmPUHAHaDt&pid=Api&P=0&h=180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <p className="card-text">Bailarina</p>
                        <p>Precio</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 col-xl-4 mt-4">
                    <div className="card" style={{ width: "2 rem" }}>
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.nvRs6Egs-U4XBijZZmPUHAHaDt&pid=Api&P=0&h=180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <p className="card-text">Bailarina</p>
                        <p>Precio</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 col-xl-4 mt-4">
                    {" "}
                    <div className="card" style={{ width: "2 rem" }}>
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.nvRs6Egs-U4XBijZZmPUHAHaDt&pid=Api&P=0&h=180"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <p className="card-text">Bailarina</p>
                        <p>Precio</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <div>
        <h1 className="detalle mt-4 mb-4">Nombre de los artistas</h1>
        <div className="row">
          <ol>
            <li>
              <h3>Charlie</h3>
            </li>
            <li>
              <h3>Maria</h3>
            </li>
            <li>
              {" "}
              <h3>Varos</h3>
            </li>
            <li>
              <h3>Dayloc</h3>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};
