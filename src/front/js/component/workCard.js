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
        className="work-image"
        style={{ width: '150px', height: '160px' }}
      />
      <div className="work-details text-light">
        <h3>{work.title}</h3>
        <p>{work.description}</p>
        <p>{work.type}</p>
        <p>{work.price} €</p>
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
    <div className="works-list bg-dark">
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
