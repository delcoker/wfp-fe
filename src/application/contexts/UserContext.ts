import React from 'react';

type UserContextProps = {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
};

const UserContext = React.createContext<UserContextProps>({
    isAuthenticated: false,
    setIsAuthenticated: () => {
    },
});

export default UserContext;
