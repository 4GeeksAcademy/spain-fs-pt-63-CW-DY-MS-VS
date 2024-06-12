import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

const artists = {
  artist1: {
    first_name: "Pablo",
    last_name: "Picasso",
    portraits: [
      "https://d7hftxdivxxvm.cloudfront.net/?height=801&quality=1&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fq1nXR7uZPvLoOXfgjLcGrg%2Fsmall.jpg&width=801",
      "https://www.singulart.com/blog/wp-content/uploads/2023/07/image-1140x509.png",
      "https://art.newcity.com/wp-content/uploads/2022/07/Old-Guitarist_G40326_83A-e1655901871198.gif",
      "https://historia-arte.com/_/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbSI6WyJcL2FydGlzdFwvaW1hZ2VGaWxlXC9wYWJsby1waWNhc3NvLXNlbGYtcG9ydHJhaXRzLWNocm9ub2xvZ3ktMi5qcGciLCJyZXNpemUsNjAwLDYwMCJdfQ.qFs_a6vEMRrXhj5G9kmDuXI01gdj9cVeV1-h/hBz1KIE.jpg",
    ],
  },
  artist2: {
    first_name: "Leonardo",
    last_name: " da Vinci",
    portraits: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7KVQ9F9Wlrnd1psv2F5ekTLP-veNiCSRXYTKIGFygntGCUAe3Qg0dICves2ObP2Y9CLU&usqp=CAU",
      "https://cdn.culturagenial.com/es/imagenes/mona-lisa-0.jpg",
      "https://antigonejournal.com/wp-content/uploads/2021/05/VM2-1024x1010.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg/400px-The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg",
    ],
  },
  artist3: {
    first_name: "Vincent",
    last_name: "van Gogh",
    portraits: [
      "https://cdn.britannica.com/78/43678-050-F4DC8D93/Starry-Night-canvas-Vincent-van-Gogh-New-1889.jpg",
      "https://www.vincentvangogh.org/assets/img/paintings/self-portrait.jpg",
      "https://www.nationalgallery.org.uk/media/34076/n-3863-00-000126-hd.jpg?rxy=0.514792899408284,0.41459627329192544&width=1920&height=1080&rnd=132385890123800000",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5VaoBzLEkT2poQhaAMGifoseZldgVH8Ipzg&s",
    ],
  },
  artist4: {
    first_name: "Rembrandt",
    last_name: "",
    portraits: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Rembrandt_Christ_in_the_Storm_on_the_Lake_of_Galilee.jpg/640px-Rembrandt_Christ_in_the_Storm_on_the_Lake_of_Galilee.jpg",
      "https://www.singulart.com/blog/wp-content/uploads/2023/08/image-66-1140x859.png",
      "https://www.artnews.com/wp-content/uploads/2021/02/SK-C-5.jpg?w=1200",
      "https://sothebys-com.brightspotcdn.com/9d/54/c3ff319e46bf9ed2565160e11a98/rembrandt-portrait-of-saskia-van-uylenburgh-1612-1642-circa-1633-1634-gemaldegalerie-alte-meister-kassel.jpg",
    ],
  },
};

const ArtistGallery = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container text-center">
    <div className="container">
  <p id="texto">Lista de Lubricantes</p>
  <img src="https://th.bing.com/th/id/R.0973017ae654bf15204c6c84613836e6?rik=%2bdvTDceq3eZPxw&riu=http%3a%2f%2f1.bp.blogspot.com%2f-YlE3uaRr1Mw%2fVq6CwYsuNYI%2fAAAAAAAAAFc%2fdfsXsS3ZysY%2fs1600%2fda-vinci.jpg&ehk=gvePfc1xadZGh9%2f0JD81AEdsmwFNms3VsQ3Q0ST%2buBk%3d&risl=&pid=ImgRaw&r=0" className="foto"/>
</div>
      <div>
        <div id="carouselExampleDark" className="carousel carousel-dark slide">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner p-4">
            <div className="carousel-item active" data-bs-interval="10000">
              <div className="row">
                <div className="col-sm-1 col-lg-6 col-xl-4 col-md-12">
                  <div className="card" style={{ width: "18rem", height: "35rem" }}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7KVQ9F9Wlrnd1psv2F5ekTLP-veNiCSRXYTKIGFygntGCUAe3Qg0dICves2ObP2Y9CLU&usqp=CAU"
                      className="card-img-top mt-2"
                      alt="..."
                      style={{ height: "15rem", objectFit: "contain" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        <h3 className="mb-5">Cristo</h3>
                      </h5>
                      <p className="card-text">Obra sobre lienzo</p>
                      <p className="card-text">Precio: 500.00 €</p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-heart  " viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="col-sm-1 col-lg-6 col-xl-4 col-md-12">
                  <div className="card" style={{ width: "18rem", height: "35rem" }}>
                    <img
                      src="https://cdn.culturagenial.com/es/imagenes/mona-lisa-0.jpg"
                      className="card-img-top mt-2"
                      alt="..."
                      style={{ height: "15rem", objectFit: "contain" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        <h3 className="mb-5">La Gioconda</h3>
                      </h5>
                      <p className="card-text">Obra sobre lienzo</p>
                      <p className="card-text">Precio: 15500.00 €</p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-heart  " viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="col-sm-1 col-lg-6 col-xl-4 col-md-12">
                  <div className="card" style={{ width: "18rem", height: "35rem", }}>
                    <img
                      src="https://antigonejournal.com/wp-content/uploads/2021/05/VM2-1024x1010.png"
                      className="card-img-top mt-2"
                      alt="..."
                      style={{ height: "15rem", objectFit: "contain" }}
                    />
                    <div className="card-body">

                      <h5 className="card-title">
                        <h3 className="mb-3">El Hombre de Vitruvio</h3>
                      </h5>
                      <p className="card-text">Obra sobre lienzo</p>
                      <p className="card-text">Precio: 700.00 €</p>
                       <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-heart  " viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="carousel-item" data-bs-interval="2000">
              <div className="row">
                <div className="col-sm-1 col-lg-6 col-xl-4 col-md-12">
                  <div className="card" style={{ width: "18rem", height: "35rem" }}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg/400px-The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg"//1
                      className="card-img-top mt-2"
                      alt="..."
                      style={{ height: "15rem", objectFit: "contain" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        <h3 className="mb-5">La ultima cena</h3>
                      </h5>
                      <p className="card-text">Obra sobre lienzo</p>
                      <p className="card-text">Precio: 45500.00 €</p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-heart  " viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="col-sm-1 col-lg-6 col-xl-4 col-md-12">
                  <div className="card" style={{ width: "18rem", height: "35rem" }}>
                    <img
                      src="https://cdn.culturagenial.com/es/imagenes/mona-lisa-0.jpg"
                      className="card-img-top mt-2"
                      alt="..."
                      style={{ height: "15rem", objectFit: "contain" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        <h3 className="mb-5">La Gioconda</h3>
                      </h5>
                      <p className="card-text">Obra sobre lienzo</p>
                      <p className="card-text">Precio: 15500.00 €</p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-heart  " viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="col-sm-1 col-lg-6 col-xl-4 col-md-12">
                  <div className="card" style={{ width: "18rem", height: "35rem", }}>
                    <img
                      src="https://antigonejournal.com/wp-content/uploads/2021/05/VM2-1024x1010.png"
                      className="card-img-top mt-2"
                      alt="..."
                      style={{ height: "15rem", objectFit: "contain" }}
                    />
                    <div className="card-body">

                      <h5 className="card-title">
                        <h3 className="mb-3">El Hombre de Vitruvio</h3>
                      </h5>
                      <p className="card-text">Obra sobre lienzo</p>
                      <p className="card-text">Precio: 700.00 €</p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-heart  " viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="carousel-item">
            <div className="row">
                <div className="col-sm-1 col-lg-6 col-xl-4 col-md-12">
                  <div className="card" style={{ width: "18rem", height: "35rem" }}>
                    <img
                      src="https://sothebys-com.brightspotcdn.com/9d/54/c3ff319e46bf9ed2565160e11a98/rembrandt-portrait-of-saskia-van-uylenburgh-1612-1642-circa-1633-1634-gemaldegalerie-alte-meister-kassel.jpg"//1
                      className="card-img-top mt-2"
                      alt="..."
                      style={{ height: "15rem", objectFit: "contain" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        <h3 className="mb-5">La ultima cena</h3>
                      </h5>
                      <p className="card-text">Obra sobre lienzo</p>
                      <p className="card-text">Precio: 45500.00 €</p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-heart  " viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="col-sm-1 col-lg-6 col-xl-4 col-md-12">
                  <div className="card" style={{ width: "18rem", height: "35rem" }}>
                    <img
                      src="https://cdn.culturagenial.com/es/imagenes/mona-lisa-0.jpg"
                      className="card-img-top mt-2"
                      alt="..."
                      style={{ height: "15rem", objectFit: "contain" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        <h3 className="mb-5">La Gioconda</h3>
                      </h5>
                      <p className="card-text">Obra sobre lienzo</p>
                      <p className="card-text">Precio: 15500.00 €</p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-heart  " viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="col-sm-1 col-lg-6 col-xl-4 col-md-12">
                  <div className="card" style={{ width: "18rem", height: "35rem", }}>
                    <img
                      src="https://antigonejournal.com/wp-content/uploads/2021/05/VM2-1024x1010.png"
                      className="card-img-top mt-2"
                      alt="..."
                      style={{ height: "15rem", objectFit: "contain" }}
                    />
                    <div className="card-body">

                      <h5 className="card-title">
                        <h3 className="mb-3">El Hombre de Vitruvio</h3>
                      </h5>
                      <p className="card-text">Obra sobre lienzo</p>
                      <p className="card-text">Precio: 700.00 €</p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-heart  " viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtistGallery;

