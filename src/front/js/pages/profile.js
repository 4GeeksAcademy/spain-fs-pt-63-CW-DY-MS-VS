import React, { useState, useContext, useEffect } from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { Context } from "../store/appContext";
import WorksComponent from "../component/worksComponent";
import ImageCloudinary from "../component/imageCloudinary";

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
    const { store, actions } = useContext(Context)
    const [profileType, setProfileType] = useState("Artist");
    const [works, setWorks] = useState([{
        artist_id: "0e322f1e-e2ef-42c1-8426-b7b389616f9e", description: "s", image: "xzzoast4kbiv0u9t1vkn",
        price: "2", title: "Straw", type: "Photography", year: "2010"
    }]);
    const [salesBalance, setSalesBalance] = useState(0);
    const [openModal, setOpenModal] = useState(false)
    const [selectedWork, setSelectedWork] = useState("");
    const [artistDescription, setArtistDescription] = useState("");

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
        <div className="container mt-5">
            <button
                className="btn btn-secondary borderRadius 0 mb-3"
                onClick={() => setProfileType(profileType === "Artist" ? "Client" : "Artist")}>
                Cambiar a {profileType === "Artist" ? "Client" : "Artist"}
            </button>
            {openModal && <WorksComponent onSubmit={handleOnSubmit} closeModal={() => setOpenModal(false)} />}
            {profileType === "Artist" ? (
                <div>
                    <h2>Perfil del Artista</h2>
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
                        <div className="my-3">
                            <label className="form-label">Descripción del Artista:</label>
                            <textarea
                                className="form-control"
                                value={artistDescription}
                                onChange={(e) => setArtistDescription(e.target.value)}
                                placeholder="Escribe una breve descripción sobre ti como artista"
                            />
                        </div>
                    </div>
                    <button className="btn btn-secondary borderRadius 0">Guardar Perfil</button>
                </div>
            ) : (
                <div>
                    <h2>Perfil del Cliente</h2>
                    {/* Contenido específico del perfil del cliente */}
                </div>
            )}

            {/* {selectedWork && (
                <div className="card" style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '300px',
                    padding: '20px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    zIndex: 1000,
                    backgroundColor: 'white'
                }}>
                    <div className="card-body">
                        <span className="close" onClick={handleCloseImage} style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            cursor: 'pointer',
                            fontSize: '20px'
                        }}>&times;</span>
                        <img src={selectedWork.imageUrl} alt={selectedWork.title} style={{ width: '50px', height: '50px', marginBottom: '15px' }} />
                        <h5 className="card-title">{selectedWork.title}</h5>
                        <button
                            type="button"
                            className="btn btn-secondary borderRadius 0 mt-2"
                            onClick={() => {
                                removeWork(selectedWork.id);
                                handleCloseImage();
                            }}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            )} */}
        </div>
    );
};



