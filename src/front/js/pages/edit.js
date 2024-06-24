import React, { useContext } from "react";
import { EditUserClient } from "../component/editClient";
import { EditUserArtist } from "../component/editArtist";
import { Context } from "../store/appContext";


export const Edit = () => {
    const { store } = useContext(Context)
    return (
        <div>
            {
                store.userArtist ? 
                (<EditUserArtist />) : (<EditUserClient />)
            }
        </div>

    )
}