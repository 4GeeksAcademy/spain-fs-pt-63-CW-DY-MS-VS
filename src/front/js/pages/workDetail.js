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
  const userData = JSON.parse(localStorage.getItem("userData"))
  const [favorites, setFavorites] = useState([])
  const [work, setWork] = useState(null);
  const userDataString = localStorage.getItem('userData');

  useEffect(() => {
    actions.getAllWorks();

    const fetchWork = async () => {
      const foundWork = store.allWorks ? await store.allWorks.find((w) => w.id === id) : null;
      setWork(foundWork);
    };

    fetchWork();

    const getFavorites = async () => {
      const favoritesArr = await actions.getFavoritesWorks(userData);
      setFavorites(favoritesArr);
    };

    getFavorites();
  }, []);

  console.log("FAVS", favorites)
  console.log("WORK", work)


  const handleFavorites = () => {
    if (!favorites.some((fav) => fav.id === work.id)) {
      actions.addToFavorites(work, userData)
      setFavorites([...favorites, work])
    } else if (favorites.some((fav) => fav.id === work.id)) {
      setFavorites(favorites.filter(fav => fav.id !== work.id))
      actions.deleteFromFavorites(work.id)
    }
  }

  //Actualizar si da tiempo para leer cantidad de likes que tiene un producto (Aunque yo creo que no dará tiempo)

  const handleAddToCart = () => {
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        if (userData.id) {
          const itemToAdd = {
            client_id: userData.id,
            work_id: work.id,
            quantity: 1,

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
          {work &&
            (<div className="row d-flex flex-nowrap ">
              <div className="col-6">
                <ImageCloudinary
                  imgId={work.image}
                  className="mb-5"
                  style={{ width: 'auto', height: '400px', objectFit: "contain", boxShadow: " 0 8px 12px rgba(0, 0, 0, 0.6)", border: "10px solid #000" }}
                  onClick={() => { }}
                /></div>
              <div className=" informacion-container col-6 mx-5">
                <div className="work-info mx-5">
                  <h5>{work.title}</h5>
                  <p>{work.description}</p>
                  <p>Año:<strong>{work.year}</strong></p>
                  <p>Type of Work : {work.type}</p>
                  <p>
                    <strong>Precio: </strong>
                    {work.price} €
                  </p>
                  <p className="like-count">
                    <strong>
                      {favorites.some((fav) => fav.id === work.id) ? <FaHeart /> : <FaRegHeart />} {likeCount}
                    </strong>
                  </p>
                  <div className="buttons ms-2">
                    <button className="like-button" onClick={handleFavorites}><FaHeart /></button>
                    {userData.type === "client" && (
                      <button className="cart-button enviarShop" onClick={handleAddToCart}>
                        <IoCartSharp /> Añadir al carrito
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default WorkDetail;
