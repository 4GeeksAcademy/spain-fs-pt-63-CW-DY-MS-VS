import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Search } from "./../component/search";
import WorkCard from "./../component/workCard";
import { Link } from 'react-router-dom'
import "../../styles/home.css";


export const Home = () => {
  const { store, actions } = useContext(Context);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    actions.getAllArtists();
   
  }, []);

  useEffect(() => {
    setFilteredArtists(store.artists);
  }, [store.artists]);

  const handleSearch = (query) => {
    if (query) {
      const filtered = store.artists.filter(artist =>
        artist.first_name.toLowerCase().includes(query.toLowerCase()) ||
        artist.last_name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredArtists(filtered);
    } else {
      setFilteredArtists(store.artists);
    }
    setShowResults(true);
  };


  return (
    <div className="text-center mt-0 mb-5">
      <div className="background-image-div">
        <h1>“En cada momento se esconde una eternidad.”</h1>
      </div>
      <div>
        <Search onSearch={handleSearch} />
        {showResults && (
          <div className="row mb-3 mt-4">
            <div className="col-sm-12">
              <div className="list-group" style={{ textAlign: "left" }}>
                {filteredArtists.map((artist, index) => (
                  <div key={index} className="list-group-item1">
                    <Link to={`artistGalery/${artist.id}`}>
                      <span>{artist.first_name} {artist.last_name} </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div class="scrollable-div "><WorkCard /></div>    
      
      {/* <div className="row mb-4 mt-4">
      <div className="col-sm-12">
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
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
              <div className="works-list">
                <WorkCard />
              </div>
            </div>
            <div className="carousel-item">
              <div className="works-list">
                <WorkCard />
              </div>
            </div>
            <div className="carousel-item">
              <div className="works-list">
                <WorkCard />
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
   */}
      <div className="showArtists text-center mb-3">
        <h1 className="detalle mt-4 mb-4">Nuestros artistas</h1>
        <div className="row mb-4 mt-4 p-4">
          {store.artists && store.artists.length > 0 ? (
            <ul className="list-group col-12">
              {store.artists.map(artist => (
                <li className="list-group-item2 bg-dark" key={artist.id}>
                  <Link to={`artistGalery/${artist.id}`}>{artist.first_name} {artist.last_name}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="col-12">
              <p>No hay artistas disponibles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
};