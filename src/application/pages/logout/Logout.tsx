import {useNavigate} from 'react-router-dom';
import React, {useContext} from "react";
import UserContext from "../../contexts/UserContext";
import AuthRepositoryImpl from "../../../infrastructure/repositories/AuthRepositoryImpl";

const Logout = () => {
    const navigate = useNavigate();
    let {setIsAuthenticated} = useContext(UserContext);
    const authRepository = new AuthRepositoryImpl();

    authRepository.logout()
        .then(() => {
            setIsAuthenticated(false);
            navigate('/');
        })
        .catch((error: any) => {
            console.log(error)
        });

    return (
        <React.Fragment>

            <h2>{process.env.REACT_APP_COMPANY_NAME}</h2>
            <h3>Come Back Soon </h3>

        </React.Fragment>

    )
}

export default Logout