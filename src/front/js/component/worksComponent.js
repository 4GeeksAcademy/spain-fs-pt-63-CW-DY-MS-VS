import React, { useContext } from "react";
import ImageInput from "./imageInput";
import { Context } from "../store/appContext";

const WorksComponent = ({ onSubmit, closeModal, }) => {

    const userData = JSON.parse(localStorage.getItem("userData"));

    let newWork = {
        title: "", type: "", year: "", image: "",
        description: "", price: "", artist_id: userData?.id
    }

    return (
        <>
            <form onSubmit={(e) => onSubmit(e, newWork)} className="modal position-absolute d-flex top-50 start-50 translate-middle 
            justify-content-center align-items-center
            bg-dark bg-opacity-50 w-100 h-100 z-3">
                <div className="bg-light w-50 h-auto border rounded-3 p-4 d-flex flex-column gap-1
                align-items-center">
                    <div className="w-100 pt-0 pb-1 modal-header d-flex justify-content-between">
                        <h5 className="modal-title">Add Your New Work</h5>
                        <button type="button" className="btn-close" onClick={closeModal}></button>
                    </div>
                    <div className="my-2">
                        <ImageInput isInForm={true} name={"Select Image"} />
                    </div>
                    <input type="text" className="form-control" required
                        onChange={(e) => newWork = { ...newWork, title: e.target.value }} placeholder="Title" />
                    <textarea className="form-control" placeholder="Description" required
                        onChange={(e) => newWork = { ...newWork, description: e.target.value }} ></textarea>
                    <input className="form-control" type="number" placeholder="Price"
                        onChange={(e) => newWork = { ...newWork, price: e.target.value }} required />
                    <select className="form-select" placeholder="Type of Work"
                        onChange={(e) => newWork = { ...newWork, type: e.target.value }} required >
                        <option value={""}>Select Type of Work</option>
                        <option>Painting</option>
                        <option>Digital Art</option>
                        <option>Photography</option>
                    </select>
                    <select className="form-select" required
                        onChange={(e) => newWork = { ...newWork, year: e.target.value }}>
                        <option value={""}>Select Year</option>
                        <option value={2020}>2020</option>
                        <option value={2010}>2010</option>
                        <option value={2000}>2000</option>
                    </select>
                    <button type="submit" className="btn btn-primary align-self-end">Save</button>
                </div>
            </form >
        </>
    )
}

export default WorksComponent