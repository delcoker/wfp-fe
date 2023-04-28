import {useNavigate} from 'react-router-dom';
import classes from './LoginPage.module.css'
import {FaEnvelope, FaLock, FaUser} from 'react-icons/fa';
import {useContext, useEffect, useState} from "react";
import Employee from "../../../domain/entities/Employee";
import UserContext from "../../contexts/UserContext";
import EmployeeRepositoryImpl from "../../../infrastructure/repositories/EmployeeRepositoryImpl";
import AuthRepositoryImpl from "../../../infrastructure/repositories/AuthRepositoryImpl";

const LoginPage = () => {
    const navigate = useNavigate();
    let {setIsAuthenticated} = useContext(UserContext);
    const employeeRepository = new EmployeeRepositoryImpl();
    const authRepository = new AuthRepositoryImpl();

    const [employeeList, setEmployeeList] = useState<Employee[]>([]);
    const [email, setEmail] = useState<string>("only@employee.com");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        getLoginEmployees()
    }, [])

    const getLoginEmployees = () => {
        employeeRepository.getLoginEmployees()
            .then((employees: Employee[]) => {
                setEmployeeList(employees);
            })
            .catch((error: any) => {
                console.log(error);
            });
    }

    const renderUsers = () => {
        if (employeeList && employeeList.length > 0) {
            return (
                employeeList.map((employee, i) => {
                    if (!employee) return;
                    if (!employee.userDao) return;
                    return (
                        <option className={classes.login_option} value={employee.email}
                                key={employee.email}
                        >
                            {employee.userDao.firstname + " " + employee.userDao.lastname}
                        </option>
                    );
                })
            )
        }
        return (
            <option value={"User"}
                    disabled
                    hidden>Username
            </option>);
    };

    const handleEmployeeSelect = (e: any) => {
        const {value} = e.target;
        setEmail(value);
    }

    const handlePassword = (e: any) => {
        const {value} = e.target;
        setPassword(value);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!(email && password)) {
            alert("No email or no password")
            return;
        }

        await authRepository.login({email: email, password: password})
            .then(() => {
                setIsAuthenticated(true);
                navigate('/dashboard');
            })
            .catch((error: any) => {
                console.log(error);
            });
    }

    return (
        <div className={classes.container}>
            <div className={classes.form_title}><h2>{process.env.REACT_APP_COMPANY_NAME}</h2></div>
            <div className={classes.form_card}>
                <div className={classes.form_card__content}>
                    <div className={classes.form_card__text}>
                        <h3>Welcome Back </h3>
                        <p>PASSWORD IS 123</p>
                    </div>

                    <form className={classes.form_card__form} onSubmit={handleSubmit}>
                        <div className={classes.form_card__input_container}>
                            <div className={classes.form_card__input_icon}>
                                <FaUser style={{color: 'rgb(38 127 255)'}}/></div>
                            <select id="select-username"
                                    onChange={handleEmployeeSelect}
                            >
                                {renderUsers()}
                            </select>
                        </div>

                        <div className={classes.form_card__input_container}>
                            <div className={classes.form_card__input_icon}>
                                <FaEnvelope style={{color: 'rgb(38 127 255)'}}/>
                            </div>
                            {/*change input type to text box and use style css*/}
                            <input type="text"
                                   value={email}
                                   placeholder='delcoker@live.ca'
                                   readOnly
                                   disabled/>
                        </div>

                        <div className={classes.form_card__input_container}>
                            <div className={classes.form_card__input_icon}>
                                <FaLock style={{color: 'rgb(38 127 255)'}}/>
                            </div>
                            <input type="password"
                                   placeholder='Password'
                                   onChange={handlePassword}/>
                        </div>

                        <button className={classes.login__button} type="submit">
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default LoginPage