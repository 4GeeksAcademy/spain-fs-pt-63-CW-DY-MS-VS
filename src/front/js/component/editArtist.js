import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditUserArtist = () => {
    const { store, actions } = useContext(Context)
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [first_name, setFirstName] = useState(userData?.first_name);
    const [last_name, setLastName] = useState(userData?.last_name);
    const [description, setDescription] = useState(userData?.description)
    const [password, setPassword] = useState({ value: '', isTouched: false });
    const [confirmPassword, setConfirmPassword] = useState({ value: '', isTouched: false });
    const navigate = useNavigate()

    const getIsFormValid1 = () => {
        return (
            first_name && last_name && description
        )
    };

    const getIsFormValid2 = () => {
        return (
            password.value.length >= 8 &&
            confirmPassword.value === password.value
        )
    };
    const handleSubmit1 = () => {
        getIsFormValid1();
        actions.updateUserArtist(first_name, last_name, description);
        clearForm1();
        navigate("/profile")
    };
    const handleSubmit2 = () => {
        getIsFormValid2();
        actions.updateUserArtistPassword(password.value);
        clearForm2();
        navigate("/profile")
    };
    const PasswordErrorMessage = () => {
        return (
            <p className="FieldError">Password should have at least 8 characters</p>
        );
    };
    const ConfirmPasswordErrorMessage = () => (
        <div className="text-danger">Passwords is not the same</div>
    );
    const clearForm1 = () => {
        setFirstName("");
        setLastName("");
        setDescription("")
    };
    const clearForm2 = () => {
        setPassword({ value: "", isTouched: false, });
        setConfirmPassword({ value: "", isTouched: false, });
    };
    console.log(store.userArtist,'prueba userArtist')
    return (

        <div className="my-5">
        
            <form onSubmit={handleSubmit1} >
                <div className="row mb-3">

                    <div className="col-sm-5 m-auto">
                        <input type="name" className="form-control " id="inputName3"
                            value={first_name}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                            placeholder="First name" />
                    </div>
                </div>
                <div className="row mb-3">

                    <div className="col-sm-5 m-auto">
                        <input type="name" className="form-control" id="inputLastName3"
                            value={last_name}
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                            placeholder="Last name" />
                    </div>
                </div>

                <div className="row mb-3">
                    <label className="d-flex justify-content-center text-primary" htmlFor="floatingTextarea">Description</label>
                    <div className="col-sm-5 m-auto">
                        <div className="form-floating">
                            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}>
                            </textarea>

                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <button type="submit" className="btn btn-primary col-sm-2  m-auto " onClick={() => handleSubmit1()} disabled={!getIsFormValid1()}>Save Changes</button>
                </div>

            </form>

            <div className="d-flex justify-content-center">
                <p type='button' className="text-danger  " data-bs-toggle="modal" data-bs-target="#changePasswordModal">Change Password</p>
            </div>

            <div className="modal fade" id="changePasswordModal" tabIndex="-1" aria-labelledby="changePasswordModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="changePasswordModalLabel">Change Password</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit2} >
                                <div className="row mb-3">
                                    <div className="col-sm-5 m-auto">
                                        <input type="password" className="form-control" id="inputPassword3" value={password.value}

                                            onChange={(e) => {
                                                setPassword({ ...password, value: e.target.value });
                                            }}
                                            onBlur={() => {
                                                setPassword({ ...password, isTouched: true });
                                            }}
                                            placeholder="Password" />
                                        {password.isTouched && password.value.length < 8 ? (
                                            <PasswordErrorMessage />
                                        ) : null}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-sm-5 m-auto ">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="inputConfirmPassword3"
                                            value={confirmPassword.value}
                                            onChange={(e) => {
                                                setConfirmPassword({ ...confirmPassword, value: e.target.value });
                                            }}
                                            onBlur={() => {
                                                setConfirmPassword({ ...confirmPassword, isTouched: true });
                                            }}
                                            placeholder="Confirm Password"
                                        />
                                        {confirmPassword.isTouched && confirmPassword.value !== password.value ? (
                                            <ConfirmPasswordErrorMessage />
                                        ) : null}
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => clearForm2()}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => handleSubmit2()} disabled={!getIsFormValid2()}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}