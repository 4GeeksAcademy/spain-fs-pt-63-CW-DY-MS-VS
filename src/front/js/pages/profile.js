import React, { useState } from "react";

 export const Profile = () => {
    const [profileType, setProfileType] = useState("Artist");
    const [works, setWorks] = useState([]);
    const [selectedWork, setSelectedWork] = useState(null);
    const [salesBalance, setSalesBalance] = useState(0);
    const [newWorkTitle, setNewWorkTitle] = useState("");
    const [artistDescription, setArtistDescription] = useState("");


    const addWork = () => {
        if (newWorkTitle.trim() !== "") {
            setWorks([...works, { id: Date.now(), title: newWorkTitle.trim(), imageUrl: "https://via.placeholder.com/50" }]);
            setNewWorkTitle("");
        }
    };

    const removeWork = (id) => {
        setWorks(works.filter(work => work.id !== id));
    };

    const handleWorkClick = (work) => {
        setSelectedWork(work);
    };

    const handleCloseImage = () => {
        setSelectedWork(null);
    };

    return (
        <div className="container mt-5">
            <button
                className="btn btn-secondary borderRadius 0 mb-3"
                onClick={() => setProfileType(profileType === "Artist" ? "Client" : "Artist")}
            >
                Cambiar a {profileType === "Artist" ? "Client" : "Artist"}
            </button>

            {profileType === "Artist" ? (
                <div>
                    <h2>Perfil del Artista</h2>
                    <div className="mb-3">
                        <div className="balance">
                            <span>Balance de Ventas: </span>
                            <p>{salesBalance}</p>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Obras:</label>
                        <div>
                            {works.map((work, index) => (
                                <span
                                    key={work.id}
                                    className="work-title"
                                    onClick={() => handleWorkClick(work)}
                                    style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}
                                >
                                    {work.title}{index < works.length - 1 && ', '}
                                </span>
                            ))}
                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                value={newWorkTitle}
                                onChange={(e) => setNewWorkTitle(e.target.value)}
                                placeholder="Título de la nueva obra"
                            />
                            <button
                                type="button"
                                className="btn btn-secondary borderRadius 0"
                                onClick={addWork}
                            >
                                Añadir Obra
                            </button>

                        </div>
                        <div className="mb-3">
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



