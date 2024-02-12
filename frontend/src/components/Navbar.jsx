import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { authorizationToken, username, logout, searchText, updateSearchText } = useContext(AuthContext);
  return (
    <nav
      className="navbar navbar-expand-lg bg-dark navbar-dark"
      style={{ width: "100vw", height: "8vh"}}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Task Management
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search here..."
              aria-label="Search"
              value={searchText}
              onChange={(e) => updateSearchText(e.target.value)}
            />
            {/* <button className="btn btn-outline-success">Search</button> */}
          </form>
        </div>
        {username.length > 0 && authorizationToken ? (
          <div className="d-flex">
            <button className="btn btn-danger mx-2" onClick={logout}>
              Logout
            </button>
            <button className="btn btn-outline-success">{username}</button>
          </div>
        ) : (
          <div className="d-flex">
            <Link className="btn btn-outline-success mx-2" to="/login">
              Login
            </Link>
            <Link className="btn btn-success" to="/register">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
