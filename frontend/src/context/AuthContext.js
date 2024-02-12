import React, { createContext } from "react";
import { URL } from "../constants/urlConstants";

const AuthContext = createContext({
  authorizationToken: null,
  username: "",
  searchText: "",
  login: () => {},
  logout: () => {},
  updateSearchText: () => {},
});

export default AuthContext;
