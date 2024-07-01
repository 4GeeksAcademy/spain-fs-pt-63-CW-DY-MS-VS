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
    <div className="text-center mt-0">
      <div className="background-image-div d-flex align-items-center">
        <h1 className="text-white text-center fw-bold jumbotron">“SHARE YOUR ARTISTIC SIDE.”</h1>
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
      <div className="scrollable-div"><WorkCard /></div>
      <div className="h-100 pb-4">
        <div className="showArtists text-center mt-4">
          <h1 className="detalle my-3">Our Artists</h1>
          <div className="row mb-4 p-4">
            {store.artists && store.artists.length > 0 ? (
              <ul className="list-group col-12">
                {store.artists.map(artist => (
                  <li className="list-group-item2 artist-container border w-50 p-2" key={artist.id}>
                    <Link className="artist-links" to={`artistGalery/${artist.id}`}>{artist.first_name} {artist.last_name}</Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="col-12">
                <p>There is no Artists</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
};