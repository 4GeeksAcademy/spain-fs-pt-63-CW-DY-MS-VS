import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import ImageCloudinary from '../component/imageCloudinary'
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

  const artistEncontrado = findArtistById(id);

  if (!artistEncontrado) {
    return <p>No se encontró ningún artista con el ID {id}</p>;
  }

  const works = store.works || [];

  return (
    <div className="container text-center">
      <div className="row d-flex">
        <div className="col-12 text-start mb-5"><h2>{`${artistEncontrado.first_name} ${artistEncontrado.last_name}`}</h2></div>
      </div>

      <div className="row d-flex">
        <div className="col-12 text-start mb-5"><h3 className="text-secondary">Email:</h3> <h2>{`${artistEncontrado.email} `}</h2></div>
      </div>
      <div className="col-12 text-start mb-5"><h2>{`${artistEncontrado.description} `}</h2></div>
      <div className="row d-flex">
      </div>

      <div className="row">
        {works.map(work => (
                <div key={work.id} className="col-12 col-md-4 mb-3">
                  <div className="container bg-white bg-opacity-50 h-100 d-flex
                  justify-content-center flex-column gap-2 pt-2
                  align-items-center" style={{ width: "300px" }}>
                    <ImageCloudinary
                      imgId={work.image}
                      className=""
                      style={{ width: 'auto', height: '200px', objectFit: "contain" }}
                      onClick={() => { }}
                    />
                    <p>{work.title}</p>
                  </div>
                </div>
              ))}
      </div>
    </div>
  );
};

export default ArtistGallery;
