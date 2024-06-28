import React, { useContext } from "react";
import { EditUserClient } from "../component/editClient";
import { EditUserArtist } from "../component/editArtist";

export const Edit = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    return (
        <div>
            {
                userData.type === "artist" ?
                    (<EditUserArtist />) : (<EditUserClient />)
            }
        </div>

    )
}