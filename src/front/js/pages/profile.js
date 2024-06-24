import React, { useState, useContext, useEffect } from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { Context } from "../store/appContext";
import WorksComponent from "../component/worksComponent";
import ImageCloudinary from "../component/imageCloudinary";
import { ClientProfile } from "../component/profileClient";
import ImageInput from "../component/imageInput";

const WorksImages = ({ works }) => {
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
    const userData = JSON.parse(localStorage.getItem("userData"));
    const { store, actions } = useContext(Context)
    const [imageUrl, setImageUrl] = useState("https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png");
    const [works, setWorks] = useState([]);
    const [salesBalance, setSalesBalance] = useState(0);
    const [openModal, setOpenModal] = useState(false)
    const [selectedWork, setSelectedWork] = useState("");
    const [artistDescription, setArtistDescription] = useState("");
    const token = localStorage.getItem("token")
    const handleImageUpload = (publicId) => {
        const cloudinaryUrl = `https://res.cloudinary.com/dxnxb4dus/image/upload/${publicId}.jpg`;  // Construct the URL
        setImageUrl(cloudinaryUrl);
    };

    useEffect(() => {
        const getArtistWorks = async () => {
            const artistWorks = await actions.getWorks(userData?.id)
            setWorks( artistWorks )
        }
        getArtistWorks()
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
    }

    //TO DO: eliminar obra 
    // const removeWork = (id) => {
    //     setWorks(works.filter(work => work.id !== id));
    // };

    return (
        <div>
            <div className="container mt-5">
                <div>
                    {openModal && <WorksComponent onSubmit={handleOnSubmit} closeModal={() => setOpenModal(false)} />}

                    <h3>{store.userArtist?.first_name} {store.userArtist?.last_name}</h3>
                    <div className="position-relative " style={{ width: '150px', height: '150px' }}>
                        <img src={imageUrl} className="img-fluid rounded-circle bg-light  object-fit-cover" style={{ width: '100%', height: '100%' }} />
                        <div className="position-absolute " style={{ bottom: '10px', right: '10px'}}>
                            <ImageInput  name={"+"} onImageUpload={handleImageUpload} />
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
                                    <MdOutlinePlaylistAdd style={{ width: "25px", height: "25px" }} />
                                </button>
                            </div>
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
            </div>
        </div>
    );
};



