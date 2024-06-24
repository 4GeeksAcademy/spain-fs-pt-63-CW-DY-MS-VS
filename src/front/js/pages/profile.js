import React, { useContext } from "react";
import { ArtistProfile } from "../component/profileArtist";
import { ClientProfile } from "../component/profileClient";






export const Profile = () => {
const token  = localStorage.getItem("token")
const userData = JSON.parse(localStorage.getItem("userData"));
    return (
        <div>
            {
                token ? (<div className="container mt-5">
                    {
                        userData?.type==='artist' ? (< ArtistProfile />) : ( < ClientProfile />  )
                    }
                </div>) : null
            }
        </div>
    );
};



