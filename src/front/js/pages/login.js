import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const { store, actions } = useContext(Context);
  const [user, setUser] = useState({ email: "", password: "", userType: "" })

  const handleSubmit = (e) => {
    e.preventDefault();

    actions.login(user);
    setUser({ email: "", password: "", userType: "" })

  };
console.log(store.token)
  return (
    <div className="container text-center">
      <h1 className="mt-5 mb-5">Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="text-center email"
            name="email"
            placeholder="email"
            value={user.email}
            onChange={(event) => setUser({ ...user, email: event.target.value })}
          />
        </div>

        <div className="mt-5">
          <input
            className="text-center password"
            name="password"
            type="password"
            placeholder="password"
            value={user.password}
            onChange={(event) => setUser({ ...user, password: event.target.value })}
          />
        </div>

        <div className="radio-group mt-4">

          <label>
            Artist
            <input
              className="artist"
              type="radio"
              name="userType"
              value="artist"
              onChange={(event) => setUser({ ...user, userType: event.target.value })}
            />
          </label>
          <label>
            Client
            <input
              className="client"
              type="radio"
              name="userType"
              value="client"
              onChange={(event) => setUser({ ...user, userType: event.target.value })}
            />
          </label>

        </div>
        
        <div>
          
      
          <button className="mt-5  go" type="submit">
            Entrar Datos
          </button>
          <div>     <Link to={"/"}> <button className="mt-5 mb-5 go">Gooooo!!!!</button></Link></div>
          <Link to="/register"><p>¡Register here!</p></Link>
        </div>
     
      </form>
    </div>
  );
};

export default Login;
