import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageCloudinary from "./imageCloudinary";
import ImageInput from "./imageInput";
import { Context } from "../store/appContext";
import { getCloudinaryUrl } from "../utils";
import WorksImages from "./WorksImages";

export const ClientProfile = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const navigate = useNavigate();
    const { store, actions } = useContext(Context)
    const [imageId, setImageId] = useState(userData?.image)
    const [works, setWorks] = useState([]);

    const handleImageUpload = (publicId) => {
        actions.updateUserImage(publicId)
        setImageId(publicId);
    };

    useEffect(() => {
        actions.getUserClient()
        const getFavorites = async () => {
            const favorites = await actions.getFavoritesWorks(userData)
            setWorks(favorites)
        }
        getFavorites()
    }, [])


    return (
        <div>
            <div className="d-flex">
                <h3>{userData?.first_name} {userData?.last_name}</h3>
                <i type="button" className="far fa-edit fs-4 px-2" onClick={() => navigate('/edit')}  ></i>
            </div>
            <div className="position-relative rounded-circle" style={{ width: '150px', height: '150px' }}>
                <ImageCloudinary className="rounded-circle" classNames={"rounded-circle"} imgId={imageId} style={{ width: '100%', height: '100%' }} />
                <div className="btn position-absolute" style={{ bottom: '10px', right: '10px' }} >
                    <ImageInput name="+" onImageUpload={handleImageUpload} />
                </div>
            </div>

            <div>
                <label className="form-label">Favorites:</label>
                <div className="d-flex align-items-center flex-wrap gap-2 border rounded-2 border-secondary p-3">
                    <WorksImages works={works} />
                </div>
                <div className="card my-2 w-75 mb-5">
                    <h5 className="card-header">Description</h5>
                    <div className="card-body">
                        <p className="card-text">{store.userArtist?.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}