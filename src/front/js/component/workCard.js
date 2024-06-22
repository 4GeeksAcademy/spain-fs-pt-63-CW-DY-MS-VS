import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/workCard.css";
import { Link } from 'react-router-dom'
import ImageCloudinary from '../component/imageCloudinary'

const WorkCard = ({ work }) => {

    const { store, actions } = useContext(Context);
   
    useEffect(() => {
        actions.getAllWorks();
        actions.getAllArtists();
    }, []);
     const artistId = "5e8f2e8b-4ab7-4ea9-87ad-2dd7f95a768e";
    
 
   
console.log(store.allWorks)
console.log(store.artists)
console.log()

    return (
        <div className="works-list">
         {store.allWorks && store.allWorks.length > 0 ? (
        store.allWorks.map((work, index) => (
         <div key={index} className=" row work-card">
          <Link to="/workDetail">
          <div> 
                <div key={work.id} className="col-12 col-md-4">
                  <div className="container bg-white bg-opacity-50 h-100 d-flex
                  justify-content-center flex-column gap-2 pt-2
                  align-items-center" style={{ width: "300px" }}>
                    <ImageCloudinary
                      imgId={work.image}
                      className=""
                      style={{ width: 'auto', height: '200px', objectFit: "contain" }}
                      onClick={() => { }}
                    />
                    
                  </div>
                </div>
              </div></Link>
         <h3>{work.title}</h3>
         <p>{work.description}</p>
         <p>{work.type}</p>
         <p>{work.price} €</p>
         {/* <p>{work.user_artist}</p> */}
       </div>
        ))
      ) : (
        <p>Loading works...</p>
      )}
    </div>
  );
};

export default WorkCard;
