import React, { useState, useContext, useEffect } from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { Context } from "../store/appContext";
import WorksComponent from "../component/worksComponent";
import ImageCloudinary from "../component/imageCloudinary";
import { useNavigate } from "react-router-dom";
import ImageInput from "./imageInput";
import WorksImages from "./WorksImages";

export const ArtistProfile = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const { store, actions } = useContext(Context)
    const [works, setWorks] = useState([]);
    const [favorites, setFavorites] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [imageId, setImageId] = useState(userData?.image)
    const navigate = useNavigate()


    useEffect(() => {
        actions.getUserArtist()
        const getArtistWorks = async () => {
            const artistWorks = await actions.getWorks(userData?.id)
            setWorks(artistWorks)
        }

        const getFavorites = async () => {
            const favoritesArr = await actions.getFavoritesWorks(userData)
            setFavorites(favoritesArr)
        }

        getArtistWorks()
        getFavorites()
    }, []);

    const addWork = (newWork) => {
        setWorks([...works, newWork]);
    };

    const handleOnSubmit = async (e, newWork) => {
        e.preventDefault()
        const work = { ...newWork, image: store.image }
        addWork(work)
        setOpenModal(false)
        actions.uploadWork(work)
    };

    const handleImageUpload = (publicId) => {
        actions.updateUserImage(publicId)
        setImageId(publicId);
    };

 
    return (
        <div>
            {<div>
                {openModal && <WorksComponent onSubmit={handleOnSubmit} closeModal={() => setOpenModal(false)} />}
                <div>
                <div className="d-flex ">
                <div className="position-relative rounded-circle my-5" style={{ width: '150px', height: '150px' }}>
                    <ImageCloudinary className="rounded-circle" classNames={"rounded-circle"} imgId={imageId} style={{ width: '100%', height: '100%' }} />
                    <div className="btn  position-absolute " style={{ bottom: '10px', right: '10px' }} >
                        <ImageInput isInForm={false} name="+" onImageUpload={handleImageUpload} />
                    </div>
                </div>
                <div className="d-flex m-auto mx-5 ">
                    <h3>{userData?.first_name} {userData?.last_name}</h3>
                    <i type="button" className="far fa-edit fs-4 px-2 text-danger" onClick={() => navigate('/edit')}  ></i>
                </div>
            </div>
                </div>
                <div className="">
                    <label className="form-label">Works:</label>
                    <div className="d-flex align-items-center flex-wrap gap-2 border rounded-2 border-secondary p-3">
                        <div className="p-2 border-dashed rounded-2 me-3">
                            <button
                                type="button"
                                className="btn btn-secondary p-4 py-5 d-flex justify-content-center align-items-center"
                                onClick={() => setOpenModal(true)}
                            >
                                <MdOutlinePlaylistAdd style={{ width: "25px", height: "25px" }} />
                            </button>
                        </div>
                        <WorksImages works={works} />
                    </div>
                    <div>
                        <label className="form-label">Favorites:</label>
                        <div className="d-flex align-items-center flex-wrap gap-2 border rounded-2 border-secondary p-3">
                            <WorksImages works={favorites} />
                        </div>
                    </div>
                    <div className="card my-2 w-75 mb-5">
                        <h5 className="card-header">Description</h5>
                        <div className="card-body">
                            <p className="card-text">{userData?.description}</p>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    );
};



