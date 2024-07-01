import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/workCard.css";
import { Link } from 'react-router-dom';
import ImageCloudinary from '../component/imageCloudinary';

const WorkCard = ({ work }) => {
  return (
    <Link to={`/workDetail/${work.id}`} className="work-card">
      <ImageCloudinary
        imgId={work.image}
        classNames="work-image"
      />
      <div className="work-details d-flex flex-column text-light justify-content-between p-2">
        <div className="d-flex flex-column align-items-start">
          <h3 className="fs-4 m-0">{work.title}</h3>
          <p className="text-start fs-6 m-0 overflow-auto">{work.description}</p>
        </div>
        <div className="d-flex justify-self-end justify-content-between w-100">
          <p className="m-0">{work.type}</p>
          <p className="m-0">{work.price} €</p>
        </div>
      </div>
    </Link>
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
