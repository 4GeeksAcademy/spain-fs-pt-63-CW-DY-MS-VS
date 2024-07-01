import React, { useContext, useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import ImageCloudinary from '../component/imageCloudinary';
import "../../styles/workDetail.css";

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
      const fetchAll = await actions.getArtistsWithWorks()
      const foundWork = store.allWorks ? await store.allWorks.find((w) => w.id === id) : null;
      setWork(foundWork);
    };

    fetchWork();

    const getFavorites = async () => {
      const favoritesArr = await actions.getFavoritesWorks(userData);
      setFavorites(favoritesArr);
    };

    if (userData) {
      getFavorites();
    }

  }, []);

  const handleFavorites = () => {
    if (!favorites.some((fav) => fav.id === work.id)) {
      actions.addToFavorites(work, userData)
      setFavorites([...favorites, work])
    } else if (favorites.some((fav) => fav.id === work.id)) {
      setFavorites(favorites.filter(fav => fav.id !== work.id))
      actions.deleteFromFavorites(work.id)
    }
  }

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

  console.log(work)

  return (
    <div className="col-12 position-absolute top-50 start-50 translate-middle d-flex justify-content-center align-items-center">
      <div className="work-detail">
        <div className="">
          {work &&
            (<div className="row d-flex frame">
              <div className="col-md-6 d-flex p-0">
                <ImageCloudinary
                  imgId={work.image}
                  classNames="work-image-detail"
                  onClick={() => { }}
                />
              </div>
              <div className=" informacion-container col-6">
                <div className="work-info">
                  <h3>{work.title}</h3>
                  <div className="border"></div>
                  <p>{work.description}</p>
                  <p>Año: <strong>{work.year}</strong></p>
                  <p>Type of Work: {work.type}</p>
                  <p>
                    <strong>Precio: </strong>
                    {work.price} €
                  </p>
                  <p className="like-count">
                    <strong>
                      {favorites && favorites.some((fav) => fav.id === work.id) ? <FaHeart /> : <FaRegHeart />} {likeCount}
                    </strong>
                  </p>
                  <div className="buttons mt-5">
                    {userData && <button className="btn like-button" onClick={handleFavorites}><FaHeart className="p-0" /></button>}
                    {userData?.type === "client" && (
                      <button className="btn btn-light cart-button enviarShop" onClick={handleAddToCart}>
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
