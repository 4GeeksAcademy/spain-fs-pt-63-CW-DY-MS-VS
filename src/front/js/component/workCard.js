import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/workCard.css";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import ImageCloudinary from '../component/imageCloudinary';

const WorkCard = ({ work }) => {
  return (
    <div className="row work-card">
      <Link to={`/workDetail/${work.id}`}>
        <div className="col-12 col-md-4">
          <div className="container bg-white bg-opacity-50 h-100 d-flex justify-content-center flex-column gap-2 pt-2 align-items-center" style={{ width: "300px" }}>
            <ImageCloudinary
              imgId={work.image}
              className=""
              style={{ width: 'auto', height: '200px', objectFit: "contain" }}
              onClick={() => { }}
            />
          </div>
        </div>
      </Link>
      <h3>{work.title}</h3>
      <p>{work.description}</p>
      <p>{work.type}</p>
      <p>{work.price} €</p>
    </div>
  );
};

const WorkList = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getAllWorks();
    actions.getAllArtists();
  }, []);

  return (
    <div className="works-list">
      {store.allWorks && store.allWorks.length > 0 ? (
        store.allWorks.map((work, index) => (
          <WorkCard key={index} work={work} />
        ))
      ) : (
        <p>Loading works...</p>
      )}
    </div>
  );
};

export default WorkList;
