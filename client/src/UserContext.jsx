import React, { createContext, useState, useContext } from 'react';

// Create a context object
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Initial state is null

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Create a custom hook to use the user context
export const useUser = () => useContext(UserContext);
