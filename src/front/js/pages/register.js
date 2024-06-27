import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const PasswordErrorMessage = () => {
    return (
        <p className="FieldError">Password should have at least 8 characters</p>
    );
};
const ConfirmPasswordErrorMessage = () => (
    <div className="text-danger">Passwords is not the same</div>
);


export const Register = () => {
    const { actions } = useContext(Context)
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState({ value: '', isTouched: false });
    const [confirmPassword, setConfirmPassword] = useState({ value: '', isTouched: false });
    const [role, setRole] = useState("Artist");
    const navigate = useNavigate()


    const getIsFormValid = () => {
        return (
            first_name &&
            last_name &&
            email &&
            password.value.length >= 8 &&
            confirmPassword.value===password.value &&
            role

        );
    };

    const clearForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword({
            value: "",
            isTouched: false,
        });
        setRole("");
    };

    const handleSubmit = (e) => {
        // e.preventDefault();
        role === 'Artist' ? actions.registerUserArtist({ first_name, last_name, email, password: password.value }) :
            actions.registerUserClient({ first_name, last_name, email, password: password.value });

        alert("Account created!");
        clearForm();
        navigate("/login")
    };

    return (
        <div className="my-5 mt-5">

            <form onSubmit={handleSubmit} >
                <div className="row mb-3 mt-5 text-center mb-3">
                    <h3>Register</h3>
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
                        <input type="email" className="form-control" id="inputEmail3" value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            placeholder="Email address" />
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
                <fieldset className="row mb-3 ">
                    <div>
                        <div className="col-sm-5 d-flex justify-content-evenly m-auto">
                            <div className="form-check ">
                                <label className="form-check-label" htmlFor="gridRadios1">
                                    <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value='Artist' onChange={(e) => setRole(e.target.value)} checked={role == 'Artist'} />
                                    Artist
                                </label>
                            </div>
                            <div className="form-check">

                                <label className="form-check-label" htmlFor="gridRadios2">
                                    <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value='Client' onChange={(e) => setRole(e.target.value)} checked={role == 'Client'} />
                                    Client
                                </label>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary col-sm-2 col-12 m-auto my-3" onClick={() => handleSubmit()} disabled={!getIsFormValid()}>Register</button>
                </fieldset>


            </form>
        </div>
    );
}

