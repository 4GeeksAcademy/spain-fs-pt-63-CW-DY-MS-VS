import React from "react";
import "../../styles/workDetail.css";
import obraImagen from "../../img/creacion adan.jpeg";

const WorkDetail = ({ obra }) => {
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
            <strong>❤️ 200</strong>
            
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default WorkDetail;
