import { createContext, useState } from 'react';

const AuthContext = createContext({});

//for index.js
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};
//for children
export default AuthContext;
