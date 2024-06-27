import React, { useContext, useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";
import "../../styles/workDetail.css";
import { Context } from "../store/appContext";
import ImageCloudinary from '../component/imageCloudinary';

const WorkDetail = ({ obra }) => {
  const [likeCount, setLikeCount] = useState(200);
  const [liked, setLiked] = useState(false);
  const { id } = useParams();
  const { store, actions } = useContext(Context);
  const userDataString = localStorage.getItem('userData');

  useEffect(() => {
    actions.getAllWorks();
  }, []);

  const work = store.allWorks ? store.allWorks.find((work) => work.id === id) : null;

  const workString = JSON.stringify(work);
  localStorage.setItem('work', workString);

  const handleFavorites = () => {
    if (!liked) {
      setLiked(true);
      actions.addToFavorites(work, userDataString);
    } else {
      setLiked(false);
      actions.deleteFromFavorites(work.id);
    }
  };

  const incrementLike = () => {
    if (!liked) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(likeCount - 1);
    }
    setLiked(!liked);
  };

  const handleAddToCart = () => {
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        if (userData.id) {
          const itemToAdd = {
            client_id: userData.id,
            work_id: work.id,
            quantity: 1
            
          };
          actions.addShoppingCar(itemToAdd);
        } else {
          console.log('La propiedad id no existe en userData');
        }
      } catch (error) {
        console.error('Error parseando userData:', error);
      }
    } else {
      console.log('No se encontró userData en localStorage');
    }
  };

  return (
    <div className="container mt-5">
      <div className="work-detail mt-5">
        <div className="work-image mt-5">
          {work ? (
            <div className="row d-flex flex-nowrap">
              <div className="col-6">
                <ImageCloudinary
                  imgId={work.image}
                  className="mb-5"
                  style={{ width: 'auto', height: '400px', objectFit: "contain", boxShadow: "0 8px 12px rgba(0, 0, 0, 0.6)", border: "10px solid #000" }}
                  onClick={() => { }}
                />
              </div>
              <div className="informacion-container col-6 mx-5">
                <div className="work-info mx-5">
                  <h5>{work.title}</h5>
                  <p>{work.description}</p>
                  <p>Año:<strong>{work.year}</strong></p>
                  <p>Type of Work : {work.type}</p>
                  <p><strong>Precio: </strong>{work.price} €</p>
                  <p className="like-count"><strong>{!liked ? <FaRegHeart /> : <FaHeart />} {likeCount}</strong></p>
                  <div className="buttons ms-2">
                    <button className="like-button" onClick={handleFavorites}><FaHeart /></button>
                    {store.token && (
                      <button className="cart-button enviarShop" onClick={handleAddToCart}>
                        <IoCartSharp /> Añadir al carrito
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default WorkDetail;
