import React from "react";

const AuthContext = React.createContext({
    isAuthenticated: false,
    user: null, 
    login: () => {},
    logout: () => {},
});

AuthContext.displayName = AuthContext;

export default AuthContext;