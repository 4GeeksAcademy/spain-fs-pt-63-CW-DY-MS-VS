import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";
import "../../styles/workDetail.css";
import obraImagen from "../../img/creacion adan.jpeg";

const WorkDetail = ({ obra }) => {
  const [likeCount, setLikeCount] = useState(200);
  const [liked, setLiked] = useState(false);

  const incrementLike = () => {
    if (!liked) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(likeCount - 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="container mt-4">
      <div className="work-detail">
        <div className="work-image">
          <img src={obraImagen} alt="La Creación de Adán." />
        </div>
        <div className="work-info">
          <h5>La Creación de Adán</h5>
          <p>
            Fresco en la bóveda de la Capilla Sixtina, pintado por Miguel Ángel alrededor del año 1511. Ilustra uno de los nueve episodios del Génesis, en el cual Dios le da vida a Adán, el primer hombre.
          </p>
          <p>
            Año:<strong> 2024</strong>
          </p>
          <p>
            <strong>Precio: </strong>30.000 €
          </p>
          <p className="like-count">
            <strong>
              {!liked ? <FaRegHeart /> : <FaHeart />}
              {" "}
              {likeCount}
            </strong>
          </p>
          <div className="buttons">
            <button className="like-button" onClick={incrementLike}>
              <FaHeart />
            </button>
            <button className="cart-button">
              <IoCartSharp /> Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WorkDetail;
