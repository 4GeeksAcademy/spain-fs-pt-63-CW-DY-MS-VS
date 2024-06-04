import React, { useState } from "react";

const Profile = () => {

    // EJEMPLO CAMBIO DE CONTENIDO CON CONDICIÓN DE TIPO DE USUARIO

    const [profileType, setProfileType] = useState("Artist")

    return (
        <div>
            <button onClick={() => setProfileType("Client")}></button>
            {profileType == "Artist" ?
             (<div>
                Profile Artist
            </div>)
            :
            (<div>
                Profile Client
            </div>)}
            <p1>HOLA</p1>
        </div>
    )
}

export default Profile