import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";




export const EditUserClient = () => {
    const { store, actions } = useContext(Context)
    const [first_name, setFirstName] = useState(store.userClient.first_name);
    const [last_name, setLastName] = useState(store.userClient.last_name);
    const [password, setPassword] = useState({ value: '', isTouched: false });
    const [confirmPassword, setConfirmPassword] = useState({ value: '', isTouched: false });
    const navigate = useNavigate()

    const getIsFormValid = () => {
        return (
            first_name &&
            last_name &&
            password.value.length >= 8 &&
            confirmPassword.value === password.value

        )
    };
    const handleSubmit = () => {
       // e.preventDefault();
        getIsFormValid();
        actions.updateUserClient(first_name, last_name, password);
        clearForm();
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
    const clearForm = () => {
        setFirstName("");
        setLastName("");
        setPassword({
            value: "",
            isTouched: false,
        });
        setRole("");
    };
    return (
        <div className="my-5">

            <form onSubmit={handleSubmit} >
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
                <div className="row mb-3">

                  <button type="submit" className="btn btn-primary col-sm-2 col-12 m-auto " onClick={() => handleSubmit()} disabled={!getIsFormValid()}>Save Changes</button>
  
                </div>
                
            </form>
        </div>
    )
}