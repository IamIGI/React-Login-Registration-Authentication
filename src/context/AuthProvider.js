import { createContext, useState } from 'react';

const AuthContext = createContext({});

//for index.js
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    // const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist')) || false);

    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};
//for children
export default AuthContext;
