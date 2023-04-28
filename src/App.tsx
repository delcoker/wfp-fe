import React, {useState} from 'react'
import {BrowserRouter as Router, Navigate, Outlet, Route, Routes} from 'react-router-dom'
import LoginPage from './application/pages/login/LoginPage'
import CartProvider from './application/contexts/store/CartProvider'
import './App.css'
import Error from "./application/pages/error/Error";
import UserContext from './application/contexts/UserContext'
import Layout from "./application/layout/Layout";

type PrivateRouteProps = {
    isAuthenticated: boolean;
    redirectPath?: string;
    outlet: JSX.Element;
    children?: React.ReactNode;
};

function App() {
    const auth = localStorage.getItem('token');
    const initialIsAuthenticated = !!auth;
    const [isAuthenticated, setIsAuthenticated] = useState(initialIsAuthenticated);

    const defaultProtectedRouteProps = {
        isAuthenticated: isAuthenticated,
        redirectPath: "/",
        outlet: <Outlet/>,
    };

    return (
        <div className="App">
            <UserContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
                    <Router>
                        <Routes>
                            <Route path="/"
                                   element={<LoginPage/>}/>
                            <Route path="/*"
                                   element={<PrivateRoute {...defaultProtectedRouteProps}
                                                          outlet={<Layout/>}/>}/>
                            <Route path="*"
                                   element={<Error/>}/>
                        </Routes>
                    </Router>
            </UserContext.Provider>
        </div>
    );

    function PrivateRoute({isAuthenticated, redirectPath, outlet}: PrivateRouteProps) {
        console.log(isAuthenticated)
        if (isAuthenticated) {
            return outlet;
        } else {
            return <Navigate to={{pathname: redirectPath}}/>;
        }
    }
}

export default App;
