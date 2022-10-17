import { createContext } from "react";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("authToken"))|| null,
    loading: false,
    error: null
};

export const AuthContext = createContext(INITIAL_STATE);


export const AuthContextProvider = ({ children }) => {
    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};