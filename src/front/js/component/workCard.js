import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/workCard.css";
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
            <div> {work.image}</div>
            <h3>{work.title}</h3>
            <p>{work.description}</p>
            <p>{work.type}</p>
            <p>{work.price} €</p>
            <p>{work.user_artist}</p>
          </div>
        ))
      ) : (
        <p>Loading works...</p>
      )}
    </div>
  );
};

export default WorkCard;
