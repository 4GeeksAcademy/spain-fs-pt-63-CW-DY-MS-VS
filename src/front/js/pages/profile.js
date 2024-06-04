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
        </div>
    )
}

export default Profile