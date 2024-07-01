import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import ImageCloudinary from '../component/imageCloudinary'
import "../../styles/workCard.css"
const ArtistGallery = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    actions.getAllArtists();
    actions.getAllWorks();
    actions.getWorks(id);
  }, [id]);

  const findArtistById = (artistId) => {
    if (store.artists && Array.isArray(store.artists)) {
      return store.artists.find(artist => artist.id === artistId);
    }
    return null;
  };

  const artistFound = findArtistById(id);

  if (!artistFound) {
    return <p>No se encontró ningún artista con el ID {id}</p>;
  }

  const works = store.works || [];

  return (
    <div className="my-5 container d-flex flex-column justify-content-center">
      <div className="d-flex flex-column flex-sm-row header-container align-items-center gap-4">
        <ImageCloudinary
          imgId={artistFound.image}
          classNames={"w-25 w-sm-75 w-md-25 rounded-circle artist-profile-image"}
        />
        <div className="border border-dark p-4 header">
          <div className="col-12 text-start">
            <h1>{`${artistFound.first_name} ${artistFound.last_name}`}</h1>
          </div>
          <div className="border border-white w-100 mb-3"></div>
          <div className="col-12 text-start mb-5">
            <h4 className="p-0 m-0">{`${artistFound.description} `}</h4>
          </div>
        </div>
      </div>
      <div className="row mb-5">
        {works.map(work => (
          <div key={work.id} className="col-12 col-md-4 mb-3 d-flex justify-content-center align-items-center">
            <div className="h-100 d-flex
                  justify-content-center flex-column 
                  align-items-center work-card-gallery gallery-frame ">
              <ImageCloudinary
                imgId={work.image}
                classNames="work-image"
              />
              <p className="w-100 h-100 p-3 m-0 text-center text-light work-details">{work.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistGallery;
