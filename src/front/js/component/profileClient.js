import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import ImageInput from "./imageInput";
import { useNavigate } from "react-router-dom";


export const ClientProfile = () => {
    const [isImageInputVisible, setIsImageInputVisible] = useState(false);
    const { store, actions } = useContext(Context)
    const toggleImageInput = () => {
        setIsImageInputVisible(!isImageInputVisible);
    };
    const [user, setUser] = useState('')
    const navigate = useNavigate();

    const [imageUrl, setImageUrl] = useState("https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png");
    const handleImageUpload = (publicId) => {
        const cloudinaryUrl = `https://res.cloudinary.com/dxnxb4dus/image/upload/${publicId}.jpg`;  // Construct the URL
        setImageUrl(cloudinaryUrl);
    };
   
    return (
        <div>
            <div className="d-flex">
                <h3>{store.userClient?.first_name} {store.userClient?.last_name}</h3>
                <i type="button" className="far fa-edit fs-4 px-2" onClick={() => navigate('/edit')}  ></i>
            </div>

            <div className="position-relative " style={{ width: '150px', height: '150px' }}>
                <img src={imageUrl} className="img-fluid rounded-circle bg-light  object-fit-cover" style={{ width: '100%', height: '100%' }} />
                <button type="button" className="btn btn-light  position-absolute" style={{ bottom: '10px', right: '10px' }} onClick={() => toggleImageInput()}>+</button>
                {isImageInputVisible && <ImageInput onImageUpload={handleImageUpload} />}
            </div>
        </div>

    )
}