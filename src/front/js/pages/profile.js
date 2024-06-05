import React, { useState } from "react";

const Profile = () => {
    const [profileType, setProfileType] = useState("Client");
    const [works, setWorks] = useState([]);

    const addWork = () => {
        setWorks([...works, { id: Date.now(), title: "" }]);
    };

    const removeWork = (id) => {
        setWorks(works.filter(work => work.id !== id));
    };

    const handleWorkChange = (id, title) => {
        setWorks(works.map(work => work.id === id ? { ...work, title } : work));
    };

    return (
        <div className="container mt-5">
            <button className="btn btn-secondary mb-3" onClick={() => setProfileType(profileType === "Artist" ? "Client" : "Artist")}>
                Cambiar a {profileType === "Artist" ? "Client" : "Artist"}
            </button>

            {profileType === "Artist" ? (
                <div>
                    <h2>Perfil del Artista</h2>
                    <div className="mb-3">
                        <label className="form-label">Obras:</label>
                        <div id="worksContainer">
                            {works.map((work) => (
                                <div key={work.id} className="input-group mb-3 work-entry">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={work.title}
                                        onChange={(e) => handleWorkChange(work.id, e.target.value)}
                                        placeholder="Título de la obra"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => removeWork(work.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button type="button" className="btn btn-primary mt-2" onClick={addWork}>
                            Añadir Obra
                        </button>
                    </div>
                    <button className="btn btn-success">Guardar Perfil</button>
                </div>
            ) : (
                <div>
                    <h2></h2>
                    {/* Contenido específico del perfil del cliente */}
                </div>
            )}
{profileType === "Client" ? (
                <div>
                    <h2>Perfil del Cliente</h2>
                    <div className="mb-3">
                        <label className="form-label">Favoritos:</label>
                        <div className="Cliente">
                            {/* {favourites.map((work) => (
                                <div key={work.id} className="input-group mb-3 work-entry">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={work.title}
                                        onChange={(e) => handleWorkChange(work.id, e.target.value)}
                                        placeholder="Título de la obra"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => removeWork(work.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))} */}
                        </div>
                        {/* <button type="button" className="btn btn-primary mt-2" onClick={addWork}>
                            Añadir Obra
                        </button> */}
                    </div>
                    <button className="btn btn-success">viendo cambios</button>
                </div>
            ) : (
                <div>
                    <h2>Perfil del Cliente</h2>
                    {/* Contenido específico del perfil del cliente */}
                </div>
            )}

        </div>
    );
};

export default Profile;
