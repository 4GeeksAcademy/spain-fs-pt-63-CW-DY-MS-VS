import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { MdOutlineDeleteForever } from "react-icons/md";
import ImageCloudinary from '../component/imageCloudinary';
import "../../styles/shopping.css";
const Shopping = () => {
  const [subTotal, setSubTotal] = useState(0);
  const { store, actions } = useContext(Context);
  const [cart, setCart] = useState([]);
  const [works, setWorks] = useState([]);

  useEffect(() => {
    actions.getAllWorks().then((worksResponse) => setWorks(worksResponse));
  }, [actions]);

  useEffect(() => {
    const getCart = async () => {
      try {
        const cartResponse = await actions.getShoppingCart();
        setCart(cartResponse);
      } catch (error) {
        console.error("Error fetching shopping cart:", error);
      }
    };

    getCart();
  }, [actions]);

  useEffect(() => {
    if (cart && cart.length > 0) {
      const total = cart.reduce((acc, item) => acc + item.total, 0);
      setSubTotal(total);
    }
  }, [cart]);

 

  return (
    <div className="container text-center justify-content-center mt-5">
      <h1 className="mb-5">Car-Shop</h1>
      <div className="aling">
        <h3 className="mb-5 text-primary">Subtotal: {subTotal.toFixed(2)}  €</h3>
      </div>
      <div className="letras w-75 text-center bg-dark text-light bg-opacity-50  "> <h1 >Tramitar {cart.length} Pedidos</h1></div>
      <div className="row mb-5 mt-3 p-3">
        {cart && cart.length > 0 ? (
          cart.map((item, index) => {
            const work = works.find(work => work.id === item.work_id);
            return (
              <div key={index} className="col-12 mb-3">
                
                <div className="card w-100">
                  <div className="card-body d-flex align-items-center">
                    {work && (
                      <div className="work-image me-3">
                        <ImageCloudinary
                          imgId={work.image}
                          className=""
                          style={{ width: 'auto', height: '150px', objectFit: "contain", boxShadow: "0 8px 12px rgba(0, 0, 0, 0.6)" }}
                        />
                      </div>
                    )}
                    <div className="work-info flex-grow-1">
                      <h5 className="card-title">{work ? work.title : "Unknown Work"}</h5>
                      <p className="card-text">{item.total.toFixed(2)} €</p>
                      <button
                        className="btn btn-danger"
                        onClick={() => actions.deleteItemFromCart(item.id)}
                      >
                        Eliminar <MdOutlineDeleteForever />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-12 text-center">No hay elementos en el carrito.</div>
        )}
      </div>
    </div>
  );
};

export default Shopping;
               