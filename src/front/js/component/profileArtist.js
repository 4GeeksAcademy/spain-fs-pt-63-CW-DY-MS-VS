import React, { useState, useContext, useEffect } from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { Context } from "../store/appContext";
import WorksComponent from "../component/worksComponent";
import ImageCloudinary from "../component/imageCloudinary";
import { useNavigate } from "react-router-dom";
import ImageInput from "./imageInput";
import { getCloudinaryUrl } from "../utils";
import WorksImages from "./WorksImages";

export const ArtistProfile = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const { store, actions } = useContext(Context)
    const [works, setWorks] = useState([]);
    const [favorites, setFavorites] = useState([])
    const [salesBalance, setSalesBalance] = useState(0);
    const [openModal, setOpenModal] = useState(false)
    const [selectedWork, setSelectedWork] = useState("");
    const [imageId, setImageId] = useState(userData?.image)
    const navigate = useNavigate()


    useEffect(() => {
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

    //TO DO: eliminar obra 
    // const removeWork = (id) => {
    //     setWorks(works.filter(work => work.id !== id));
    // };

    return (
        <div>
            {<div>
                {openModal && <WorksComponent onSubmit={handleOnSubmit} closeModal={() => setOpenModal(false)} />}
                <div>
                    <div className="d-flex">
                        <h3>{store.userArtist?.first_name} {store.userArtist?.last_name}</h3>
                        <i type="button" className="far fa-edit fs-4 px-2" onClick={() => navigate('/edit')}  ></i>
                    </div>
                    <div className="position-relative custom-modal">
                        <ImageCloudinary imgId={imageUrl} classNames={photo-Claudinary} />
                        <div className="btn  position-absolute bottom-modal" onClick={() => toggleImageInput()}>
                            {!isImageInputVisible && <ImageInput name="+" onImageUpload={handleImageUpload} />}
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="balance">
                        <span>Balance de Ventas: </span>
                        <p>{salesBalance}</p>
                    </div>
                </div>
                <div className="">
                    <label className="form-label">Obras:</label>
                    <div className="d-flex align-items-center flex-wrap gap-2 border rounded-2 border-secondary p-3">
                        <div className="p-2 border-dashed rounded-2 me-3">
                            <button
                                type="button"
                                className="btn btn-secondary p-4 py-5 d-flex justify-content-center align-items-center"
                                onClick={() => setOpenModal(true)}
                            >
                                <MdOutlinePlaylistAdd className="custom-icon-size"/>
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



