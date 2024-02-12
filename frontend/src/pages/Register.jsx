import React, { useState } from "react";
import "../styles/Login.css";
import { Link } from "react-router-dom";
import { URL } from "../constants/urlConstants";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(URL.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.username,
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const data = await response.json();
      console.log("Register data", data);
      if (data.statusCode === 201) {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.error("Register Error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="card" style={{ width: "30vw" }}>
        <div className="card-body">
          <h3 style={{ width: "100%", textAlign: "center" }}>Register</h3>
          <div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                aria-describedby="emailHelp"
                placeholder="Enter username"
                value={credentials.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={credentials.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter password"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>
            <button
              className="btn btn-success"
              style={{ width: "100%" }}
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              alignContent: "center",
              marginTop: "10px",
            }}
          >
            <span>Already registered?</span> &nbsp;
            <Link to="/login">Click here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
