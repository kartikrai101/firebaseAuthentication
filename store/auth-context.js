import React, {useState} from 'react'; // importing the React function from react library

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: (token) => {}
});

export const AuthContextProvider = (props) => { // exporting this component as well along
    // with the AuthContext which is the default export of this file
    const [token, setToken] = useState(null); // initializing a useState variable to store
    // the value of tokenId of a user when they login

    const userIsLoggedIn = !!token; // what this will do is, make userIsLoggedIn 'true' if
    // token is not an empty string and will make it false if the token is empty string

    const loginHandler = (token) => {
        setToken(token); // setting the value of token variable if there exists a token
    };

    const logoutHandler = (token) => {
        setToken(null); // setting the value of token variable to null if there is no 
        // existing value for token
    };

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }
    
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
