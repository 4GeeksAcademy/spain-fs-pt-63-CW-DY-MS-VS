import React, { useState, useContext, useEffect } from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { Context } from "../store/appContext";
import WorksComponent from "../component/worksComponent";
import ImageCloudinary from "../component/imageCloudinary";
import { ClientProfile } from "../component/profileClient";
import ImageInput from "../component/imageInput";

const WorksImages = ({ works }) => {

    console.log(works)

    return (
        <>
            {works.map((work, index) => (
                <ImageCloudinary
                    key={index}
                    imgId={work.image}
                    classNames="work-title d-flex flex-col"
                    onClick={() => { }}//handleWorkClick(work)
                    style={{ cursor: 'pointer', textDecoration: 'underline', width: "auto", height: "150px" }}
                />
            ))}
        </>
    )
}

export const Profile = () => {
    const { store, actions } = useContext(Context)
    const [isImageInputVisible, setIsImageInputVisible] = useState(false);
    const [imageUrl, setImageUrl] = useState("https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png");
    const [works, setWorks] = useState([{
        artist_id: "d4ffa44e-67c2-40a5-be7a-08bb261acf26", description: "s", image: "xzzoast4kbiv0u9t1vkn",
        price: "2", title: "Straw", type: "Photography", year: "2010"
    }]);
    const [salesBalance, setSalesBalance] = useState(0);
    const [openModal, setOpenModal] = useState(false)
    const [selectedWork, setSelectedWork] = useState("");
    const [artistDescription, setArtistDescription] = useState("");
    const token = localStorage.getItem("token")
    const handleImageUpload = (publicId) => {
        const cloudinaryUrl = `https://res.cloudinary.com/dxnxb4dus/image/upload/${publicId}.jpg`;  // Construct the URL
        setImageUrl(cloudinaryUrl);
    };
    const toggleImageInput = () => {
        setIsImageInputVisible(!isImageInputVisible);
    };
    useEffect(() => {
        actions.getUserArtist()
    }, []);
    console.log(store.userArtist)

    const addWork = (newWork) => {
        setWorks([...works, newWork]);
    };

    const handleOnSubmit = async (e, newWork) => {
        e.preventDefault()
        const work = { ...newWork, image: store.image }
        addWork(work)
        setOpenModal(false)
        actions.uploadWork(work)
    }

    //TO DO: eliminar obra 
    // const removeWork = (id) => {
    //     setWorks(works.filter(work => work.id !== id));
    // };
    console.log('works', works)
    console.log('store', store)
    return (
        <div>
            {
                token ? (<div className="container mt-5">
                    {store.userArtist ? (
                        <div>
                            {openModal && <WorksComponent onSubmit={handleOnSubmit} closeModal={() => setOpenModal(false)} />}
                                
                            <h3>{store.userArtist?.first_name} {store.userArtist?.last_name}</h3> 
                            <div className="position-relative " style={{ width: '150px', height: '150px' }}>
                                <img src={imageUrl} className="img-fluid rounded-circle bg-light  object-fit-cover" style={{ width: '100%', height: '100%' }} />
                                <button type="button" className="btn btn-light  position-absolute" style={{ bottom: '10px', right: '10px' }} onClick={() => toggleImageInput()}>+</button>
                                {isImageInputVisible && <ImageInput onImageUpload={handleImageUpload} />}
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
                                            <MdOutlinePlaylistAdd style={{ width: "25px", height: "25px" }} />
                                        </button>
                                    </div>
                                    <WorksImages works={works} />
                                </div>
                                <div className="card my-2 w-75 ">
                                    <h5 className="card-header">Description</h5>
                                    <div className="card-body">
                                        <p className="card-text">{store.userArtist?.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            < ClientProfile />

                            {/* Contenido específico del perfil del cliente */}
                        </div>
                    )}
                </div>) : null
            }
        </div>

    );
};



