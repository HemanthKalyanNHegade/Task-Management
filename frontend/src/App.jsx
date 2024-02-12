import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AuthContext from "./context/AuthContext";
import { URL } from "./constants/urlConstants";
import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [authorizationToken, setAuthorizationToken] = useState(null);
  const [username, setUsername] = useState("");
  const [searchText, setSearchText] = useState("");
  const login = async (e, username, password) => {
    e.preventDefault();
    try {
      const response = await fetch(URL.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log("Login data", data);
      if (data.statusCode === 200) {
        setUsername(data.username);
        setAuthorizationToken(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const logout = () => {
    try {
      setUsername("");
      setAuthorizationToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const localUsername = localStorage.getItem("username");
    if (token) {
      setAuthorizationToken(token);
    }

    if (localUsername) {
      setUsername(localUsername);
    }
  }, []);

  const updateSearchText = (text) => {
    setSearchText(text);
  };
  return (
    <AuthContext.Provider
      value={{
        authorizationToken: authorizationToken,
        username: username,
        searchText: searchText,
        login: login,
        logout: logout,
        updateSearchText: updateSearchText,
      }}
    >
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            exact
            element={authorizationToken ? <Homepage /> : <Login />}
          />
          <Route
            path="/login"
            exact
            element={authorizationToken ? <Homepage /> : <Login />}
          />
          <Route path="/register" exact element={<Register />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
