import React from "react";
import "../../styles/shopping.css";

export default function Shopping() {
  const carShopp=[
      {
      name: "Obra1",
      description:"Marejada",
      img:"4314",
      artista:"Perico",
      id:"1",
      precio:"80"
      },
      {
        name: "Obra2",
        description:"Bolonia",
        img:"422",
        artista:"Perico",
        id:"2",
        precio:"40"
    
      },
      {
        name: "Obra3",
        description:"Morado",
        img:"4315",
        artista:"Perico",
        id:"3",
        precio:"70"
        } 

];

  return (
    <div className="container text-left">
      {

      }
      <h3>Car-Shop <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
      </svg></h3>
      <div className="row d-flex text-start">
        <div className="col-2">
          <h4 className="mt-2 mb-2 text-danger">SubTotal: </h4>
        </div>
        <div className="col-6">
          <h3 className="text-dark mb-2">24360000.00 €</h3>
        </div>
        <div className="col-4 text-end">Vaciar el carro <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-trash text-danger" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
        </svg> </div>
      </div>
      <div className="alert alert-warning alert-dismissible fade show text-center p-3" role="alert" style={{ boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)", }}>

        <strong>Tramitar pedidos</strong> (4 productos)
      </div>





      <div className="row mb-5 mt-3 p-3">
        <div className="d-flex justify-content-center align-items-start gap w-100" style={{ height: "100%" }}>

          <div className="p-2  flex-item d-flex flex-column align-items-center" style={{ flex: 1 }}>
            <div className="row w-100">
              <div className="col-2 d-flex align-items-center justify-content-center">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" style={{ width: "30px", height: "30px" }} />

                </div>
              </div>
              <div className="col-10 d-flex align-items-center justify-content-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7KVQ9F9Wlrnd1psv2F5ekTLP-veNiCSRXYTKIGFygntGCUAe3Qg0dICves2ObP2Y9CLU&usqp=CAU"
                  className="card-img-top mt-2"
                  alt="..."
                  style={{
                    height: "14rem",
                    objectFit: "contain",
                    border: "10px solid #000",
                    padding: "10px",
                    width: "14rem",
                    alignSelf: "center",
                    boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
                    backgroundColor: " #5d5b5b"
                  }}
                />
              </div>
            </div>
          </div>

          <div className="p-2  flex-item" style={{ flex: 2, backgroundColor: "rgb(173, 222, 222)", boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)", color: "black", borderRadius: "20px" }}>
            <div className="row d-flex">
              <div className="col-8"><h3>Cristo</h3></div>
              <div className="col-4"><h3 style={{ fontFamily: "cursive" }}>150000.00 €</h3></div>
            </div>
            <h4>Davinci</h4>
            <p style={{ fontFamily: "cursive" }}>Sed non leo sit amet sem porttitor aliquet vitae egestas risus. In nec diam ac nunc aliquet sodales eu nec nunc. Duis consectetur egestas placerat. Ut consequat libero eget egestas laoreet. Nulla et rhoncus metus, sit amet mattis lectus. Proin sed porttitor justo. Etiam ullamcorper nibh et ipsum lacinia sodales. </p>
            <div className="text-end">
              <button className="mb-3 rounded-pill bg-info opacity-50 text-white">Comprar</button>
              <button className="mb-3 ms-1 rounded-pill bg-danger opacity-50 text-white ">Eliminar</button>
            </div>
          </div>


        </div>
        <div className="d-flex justify-content-center align-items-start gap w-100" style={{ height: "100%" }}>

          <div className="p-2  flex-item d-flex flex-column align-items-center" style={{ flex: 1 }}>
            <div className="row w-100">
              <div className="col-2 d-flex align-items-center justify-content-center">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" style={{ width: "30px", height: "30px" }} />

                </div>
              </div>
              <div className="col-10 d-flex align-items-center justify-content-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg/400px-The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg"
                  className="card-img-top mt-2"
                  alt="..."
                  style={{
                    height: "14rem",
                    objectFit: "contain",
                    border: "10px solid #000",
                    padding: "10px",
                    width: "14rem",
                    alignSelf: "center",
                    boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
                    backgroundColor: " #5d5b5b"
                  }}
                />
              </div>
            </div>
          </div>

          <div className="p-2  flex-item" style={{ flex: 2, backgroundColor: "rgb(173, 222, 222)", boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)", color: "black", borderRadius: "20px" }}>
            <div className="row d-flex">
              <div className="col-8"><h3>La Ultima Cena</h3></div>
              <div className="col-4"><h3 style={{ fontFamily: "cursive" }}>150000.00 €</h3></div>
            </div>
            <h4>Davinci</h4>
            <p style={{ fontFamily: "cursive" }}>Sed non leo sit amet sem porttitor aliquet vitae egestas risus. In nec diam ac nunc aliquet sodales eu nec nunc. Duis consectetur egestas placerat. Ut consequat libero eget egestas laoreet. Nulla et rhoncus metus, sit amet mattis lectus. Proin sed porttitor justo. Etiam ullamcorper nibh et ipsum lacinia sodales. </p>
            <div className="text-end">
              <button className="mb-3 rounded-pill bg-info opacity-50 text-white">Comprar</button>
              <button className="mb-3 ms-1 rounded-pill bg-danger opacity-50 text-white ">Eliminar</button>
            </div>
          </div>


        </div>
        <div className="d-flex justify-content-center align-items-start gap w-100" style={{ height: "100%" }}>

          <div className="p-2  flex-item d-flex flex-column align-items-center" style={{ flex: 1 }}>
            <div className="row w-100">
              <div className="col-2 d-flex align-items-center justify-content-center">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" style={{ width: "30px", height: "30px" }} />

                </div>
              </div>
              <div className="col-10 d-flex align-items-center justify-content-center">
                <img
                  src="https://www.singulart.com/blog/wp-content/uploads/2023/08/image-66-1140x859.png"
                  className="card-img-top mt-2"
                  alt="..."
                  style={{
                    height: "14rem",
                    objectFit: "contain",
                    border: "10px solid #000",
                    padding: "10px",
                    width: "14rem",
                    alignSelf: "center",
                    boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
                    backgroundColor: " #5d5b5b"
                  }}
                />
              </div>
            </div>
          </div>

          <div className="p-2  flex-item" style={{ flex: 2, backgroundColor: "rgb(173, 222, 222)", boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)", color: "black", borderRadius: "20px" }}>
            <div className="row d-flex">
              <div className="col-8"><h3>Anatomía</h3></div>
              <div className="col-4"><h3 style={{ fontFamily: "cursive" }}>18000.00 €</h3></div>
            </div>
            <h4>Rembrandt</h4>
            <p style={{ fontFamily: "cursive" }}>Sed non leo sit amet sem porttitor aliquet vitae egestas risus. In nec diam ac nunc aliquet sodales eu nec nunc. Duis consectetur egestas placerat. Ut consequat libero eget egestas laoreet. Nulla et rhoncus metus, sit amet mattis lectus. Proin sed porttitor justo. Etiam ullamcorper nibh et ipsum lacinia sodales. </p>
            <div className="text-end">
              <button className="mb-3 rounded-pill bg-info opacity-50 text-white">Comprar</button>
              <button className="mb-3 ms-1 rounded-pill bg-danger opacity-50 text-white ">Eliminar</button>
            </div>
          </div>


        </div>
        <div className="d-flex justify-content-center align-items-start gap w-100" style={{ height: "100%" }}>

          <div className="p-2  flex-item d-flex flex-column align-items-center" style={{ flex: 1 }}>
            <div className="row w-100">
              <div className="col-2 d-flex align-items-center justify-content-center">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" style={{ width: "30px", height: "30px" }} />

                </div>
              </div>
              <div className="col-10 d-flex align-items-center justify-content-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5VaoBzLEkT2poQhaAMGifoseZldgVH8Ipzg&s"
                  className="card-img-top mt-2"
                  alt="..."
                  style={{
                    height: "14rem",
                    objectFit: "contain",
                    border: "10px solid #000",
                    padding: "10px",
                    width: "14rem",
                    alignSelf: "center",
                    boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
                    backgroundColor: " #5d5b5b"
                  }}
                />
              </div>
            </div>
          </div>

          <div className="p-2  flex-item" style={{ flex: 2, backgroundColor: "rgb(173, 222, 222)", boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)", color: "black", borderRadius: "20px" }}>
            <div className="row d-flex">
              <div className="col-8"><h3>Noche Estrellada</h3></div>
              <div className="col-4"><h3 style={{ fontFamily: "cursive" }}>10000.00 €</h3></div>
            </div>
            <h4>Dali</h4>
            <p style={{ fontFamily: "cursive" }}>Sed non leo sit amet sem porttitor aliquet vitae egestas risus. In nec diam ac nunc aliquet sodales eu nec nunc. Duis consectetur egestas placerat. Ut consequat libero eget egestas laoreet. Nulla et rhoncus metus, sit amet mattis lectus. Proin sed porttitor justo. Etiam ullamcorper nibh et ipsum lacinia sodales. </p>
            <div className="text-end">
              <button className="mb-3 rounded-pill bg-info opacity-50 text-white">Comprar</button>
              <button className="mb-3 ms-1 rounded-pill bg-danger opacity-50 text-white ">Eliminar</button>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
