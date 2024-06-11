import React, { useState, useContext, useEffect } from "react";
import { AdvancedImage } from '@cloudinary/react';
import { Context } from "../store/appContext";
import ImageInput from "../component/imageInput";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { MdOutlinePlaylistAdd } from "react-icons/md";

export const Profile = () => {
    const { store, actions } = useContext(Context)
    const [profileType, setProfileType] = useState("Artist");
    const [works, setWorks] = useState([{
        artist_id
            :
            "0e322f1e-e2ef-42c1-8426-b7b389616f9e",
        description
            :
            "s",
        image
            :
            "xzzoast4kbiv0u9t1vkn",
        price
            :
            "2",
        title
            :
            "Straw",
        type
            :
            "Photography",
        year
            :
            "2010"
    }]);
    const [salesBalance, setSalesBalance] = useState(0);
    const [openModal, setOpenModal] = useState(false)
    const [selectedWork, setSelectedWork] = useState("");
    const [artistDescription, setArtistDescription] = useState("");
    const [shouldSubmit, setShouldSubmit] = useState(false);

    const [newWork, setNewWork] = useState({
        title: "", type: "", year: "", image: "",
        description: "", price: "", artist_id: "0e322f1e-e2ef-42c1-8426-b7b389616f9e"
    })

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dxnxb4dus'
        }
    })

    const addWork = () => {
        setWorks([...works, newWork]);
        setNewWork({
            title: "", type: "", year: "", image: "",
            description: "", price: "", artist_id: "0e322f1e-e2ef-42c1-8426-b7b389616f9e"
        })
    };

    const removeWork = (id) => {
        setWorks(works.filter(work => work.id !== id));
    };

    // const handleWorkClick = (work) => {
    //     setSelectedWork(work);
    // };

    const settersFunction = async () => {
        setNewWork({ ...newWork, image: store.image })
        setShouldSubmit(true)
        setOpenModal(false)
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        await settersFunction()
        addWork()
    }

    useEffect(() => {
        if (shouldSubmit) {
            console.log(newWork);
            setShouldSubmit(false);
            actions.uploadWork(newWork)
        }
    }, [shouldSubmit])

    useEffect(() => {
        console.log(works)
    }, [works])

    console.log(shouldSubmit)

    return (
        <div className="container mt-5">
            <button
                className="btn btn-secondary borderRadius 0 mb-3"
                onClick={() => setProfileType(profileType === "Artist" ? "Client" : "Artist")}>
                Cambiar a {profileType === "Artist" ? "Client" : "Artist"}
            </button>
            {openModal && <form onSubmit={handleOnSubmit} className="modal position-absolute d-flex top-50 start-50 translate-middle 
            justify-content-center align-items-center
            bg-dark bg-opacity-50 w-100 h-100 z-3">
                <div className="bg-light w-50 h-auto border rounded-3 p-4 d-flex flex-column gap-1
                align-items-center">
                    <div className="w-100 pt-0 pb-1 modal-header d-flex justify-content-between">
                        <h5 className="modal-title">Add Your New Work</h5>
                        <button type="button" className="btn-close" onClick={() => setOpenModal(false)}></button>
                    </div>
                    <div className="my-2">
                        <ImageInput />
                    </div>
                    <input type="text" className="form-control" value={newWork.title} required
                        onChange={(e) => setNewWork({ ...newWork, title: e.target.value })} placeholder="Title" />
                    <textarea className="form-control" placeholder="Description" value={newWork.description} required
                        onChange={(e) => setNewWork({ ...newWork, description: e.target.value })} ></textarea>
                    <input className="form-control" type="number" placeholder="Price" value={newWork.price}
                        onChange={(e) => setNewWork({ ...newWork, price: e.target.value })} required />
                    <select className="form-select" placeholder="Type of Work" value={newWork.type}
                        onChange={(e) => setNewWork({ ...newWork, type: e.target.value })} required >
                        <option value={""}>Select Type of Work</option>
                        <option>Painting</option>
                        <option>Digital Art</option>
                        <option>Photography</option>
                    </select>
                    <select value={newWork.year} className="form-select" required
                        onChange={(e) => setNewWork({ ...newWork, year: e.target.value })}>
                        <option value="">Select Year</option>
                        <option value={2020}>2020</option>
                        <option value={2010}>2010</option>
                        <option value={2000}>2000</option>
                    </select>
                    <button type="submit" className="btn btn-primary align-self-end">Save</button>
                </div>
            </form>}
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
                            {works.map((work, index) => (
                                <AdvancedImage
                                    key={index}
                                    cldImg={cld.image(work.image)}
                                    className="work-title d-flex flex-col"
                                    onClick={() => { }}//handleWorkClick(work)
                                    style={{ cursor: 'pointer', textDecoration: 'underline', width: "auto", height: "150px" }}
                                />
                                // {work.title}
                            ))}
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

            {selectedWork && (
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
            )}
        </div>
    );
};

export default Profile;
