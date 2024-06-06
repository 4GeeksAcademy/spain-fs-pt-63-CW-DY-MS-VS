import React, { useState } from "react";

const Profile = () => {
    const [profileType, setProfileType] = useState("Artist");
    const [works, setWorks] = useState([]);
    const [selectedWork, setSelectedWork] = useState(null);
    const [salesBalance, setSalesBalance] = useState(0);
    const [newWorkTitle, setNewWorkTitle] = useState("");

    const addWork = () => {
        if (newWorkTitle.trim() !== "") {
            setWorks([...works, { id: Date.now(), title: newWorkTitle.trim(), imageUrl: "" }]);
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
                className="btn btn-secondary mb-3" 
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
                        <ul>
                            {works.map((work) => (
                                <li 
                                    key={work.id} 
                                    className="work-title"
                                    onClick={() => handleWorkClick(work)}
                                >
                                    <span>{work.title}</span>
                                </li>
                            ))}
                        </ul>
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
                                className="btn btn-secondary" 
                                onClick={addWork}
                            >
                                Añadir Obra
                            </button>
                        </div>
                    </div>
                    <button className="btn btn-success">Guardar Perfil</button>
                </div>
            ) : (
                <div>
                    <h2>Perfil del Cliente</h2>
                    {/* Contenido específico del perfil del cliente */}
                </div>
            )}

            {selectedWork && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseImage}>&times;</span>
                        <h3>{selectedWork.title}</h3>
                        {/* Aquí iría la imagen de la obra */}
                        <button
                            type="button"
                            className="btn btn-danger mt-2"
                            onClick={() => removeWork(selectedWork.id)}
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
