import React from "react";
import ImageCloudinary from "../component/imageCloudinary";

const WorksImages = ({ works }) => {
    return (
        <>
            {works.map((work, index) => (
                <ImageCloudinary
                    key={index}
                    imgId={work.image}
                    classNames="work-title d-flex flex-col"
                    onClick={() => { }}//handleWorkClick(work)
                    style={{ cursor: 'pointer', textDecoration: 'underline', width: "auto", height: "150px" }}
                />
            ))}
        </>
    )
}

export default WorksImages