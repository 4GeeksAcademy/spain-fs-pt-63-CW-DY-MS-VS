import React, { useEffect, useRef, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { AdvancedImage } from '@cloudinary/react';
import { fill } from "@cloudinary/url-gen/actions/resize";
import { useContext } from "react";
import { Context } from "../store/appContext";

const ImageInput = ({ onImageUpload, name }) => {
    const cloudinaryRef = useRef()
    const widgetRef = useRef()
    const [imgId, setImgId] = useState("")
    const { actions } = useContext(Context)

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "dxnxb4dus",
            uploadPreset: "wkzp4i6a"
        }, function (error, result) {
            if (!error && result && result.event === "success") {
                setImgId(result.info.public_id);
                handleUploadImage(result.info.public_id)
            }
        })
    }, []);

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dxnxb4dus'
        }
    });

    const myImage = imgId ? cld.image(imgId) : null
    myImage && myImage.resize(fill().height(225))

    const handleUploadImage = async (publicId) => {
        try {
            const image = await actions.uploadWorkImage(publicId);
            actions.setImage(publicId);
            onImageUpload(publicId);
            console.log("Image uploaded:", image);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <div>
            {!myImage && <button className="btn btn-secondary d-flex align-items-center justify-content-center" onClick={() =>
                widgetRef.current.open()}>{name}</button>}
            {/* {myImage && <AdvancedImage cldImg={myImage} />} */}
        </div>
    )
}

export default ImageInput
