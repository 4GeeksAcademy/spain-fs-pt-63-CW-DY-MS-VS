import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageCloudinary from "./imageCloudinary";
import ImageInput from "./imageInput";
import { Context } from "../store/appContext";





export const ClientProfile = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const navigate = useNavigate();
    const { store, actions } = useContext(Context)
    const [imageUrl, setImageUrl] = useState(userData?.image)
    const [isImageInputVisible, setIsImageInputVisible] = useState(false);

    useEffect(() => {
        actions.getUserClient()
    }, [])

    const handleImageUpload = (publicId) => {
        const cloudinaryUrl = `https://res.cloudinary.com/dxnxb4dus/image/upload/${publicId}.jpg`;  // Construct the URL
        setImageUrl(cloudinaryUrl);
        setIsImageInputVisible(false)
    };
    const toggleImageInput = () => {
        setIsImageInputVisible(!isImageInputVisible);
    };

    return (
        <div>
            <div className="d-flex">
                <h3>{store.userClient?.first_name} {store.userClient?.last_name}</h3>
                <i type="button" className="far fa-edit fs-4 px-2" onClick={() => navigate('/edit')}  ></i>
            </div>
            <div className="position-relative custom-modal">
                <ImageCloudinary imgId={imageUrl} classNames={photo-claudinary}/>
                <div className="btn  position-absolute bottom-modal" onClick={() => toggleImageInput()} >
                    {!isImageInputVisible && <ImageInput name="+" onImageUpload={handleImageUpload} />}
                </div>
            </div>
        </div>

    )
}