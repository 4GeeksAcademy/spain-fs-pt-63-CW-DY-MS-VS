import React from "react";
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen/index";

const cld = new Cloudinary({
    cloud: {
        cloudName: process.env.CLOUDINARY_KEY
    }
})

const ImageCloudinary = ({ imgId, classNames, onClick, style }) => {

    return (
        <AdvancedImage
            cldImg={cld.image(imgId)}
            className={classNames}
            onClick={onClick}//handleWorkClick(work)
            style={style}
        />
    )
}

export default ImageCloudinary