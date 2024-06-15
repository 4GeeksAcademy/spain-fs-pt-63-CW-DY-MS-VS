import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const ClientProfile = () => {
    const { store, actions } = useContext(Context)
    return (
        <div>
          {// <h3>{store.userClient.first_name}+' '+{store.userClient.last_name}</h3>
          } 
            <div className="position-relative ">
                <div className="col-md-4">
                    <img src="https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png" className="img-fluid rounded-circle bg-light  object-fit-cover" style={{ width: '150px', height: '150px' }} />
                </div>
                <button type="button" className="btn btn-light fs-5 position-absolute bottom-0 start-0">+</button>
            </div>
        </div>

    )
}