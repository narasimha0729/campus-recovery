import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { validateUser } from "../../Services/LoginService";
import './LoginStyle.css';

const LoginPage = () => {
    let navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });
    const [flag, setFlag] = useState(true);

    const validateLogin = (e) => {
        e.preventDefault();
        validateUser(loginData.username, loginData.password)
            .then((response) => {
                let role = String(response.data);
                if (role === "Admin")
                    navigate('/admin-menu');
                else if (role === "Student")
                    navigate('/student-menu');
                else
                    setFlag(false);
            })
            .catch((error) => {
                console.error('Login failed', error);
                setFlag(false);
                if (error.response && error.response.status === 403) {
                    setErrors({ submit: 'Login forbidden: check your credentials.' });
                } else {
                    setErrors({ submit: 'Login failed: please try again.' });
                }
            });
    }

    const onChangeHandler = (event) => {
        event.persist();
        setFlag(true);
        const name = event.target.name;
        const value = event.target.value;
        setLoginData(values => ({ ...values, [name]: value }));
    };

    const handleValidation = (event) => {
        event.preventDefault();
        let tempErrors = {};
        let isValid = true;

        if (!loginData.username.trim()) {
            tempErrors.username = "User Name is required";
            isValid = false;
        }

        if (!loginData.password.trim()) {
            tempErrors.password = "Password is required";
            isValid = false;
        }

        setErrors(tempErrors);
        if (isValid) {
            validateLogin(event);
        }
    };

    const registerNewUser = (e) => {
        navigate('/register');
    }

    return (
        <div className="glass-container">
            <div className="glass-card">
                <h2>Login</h2>

                <form onSubmit={handleValidation}>
                    <div className="glass-input-group">
                        <label>Email</label>
                        <input
                            placeholder="Enter your email or username"
                            name="username"
                            className="glass-input"
                            value={loginData.username}
                            onChange={onChangeHandler}
                        />
                        {errors.username && (
                            <small className="text-danger mt-1 d-block">{errors.username}</small>
                        )}
                    </div>

                    <div className="glass-input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            className="glass-input"
                            value={loginData.password}
                            onChange={onChangeHandler}
                        />
                        {errors.password && (
                            <small className="text-danger mt-1 d-block">{errors.password}</small>
                        )}
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="rememberMe" />
                            <label className="form-check-label glass-link" htmlFor="rememberMe">
                                Remember Me
                            </label>
                        </div>
                        <a href="#" className="glass-link">Forget Password</a>
                    </div>

                    <button
                        type="submit"
                        className="glass-btn w-100"
                    >
                        Log in
                    </button>

                    {errors.submit && (
                        <div className="text-danger text-center mt-3 font-weight-bold">{errors.submit}</div>
                    )}
                </form>

                {!flag && (
                    <p className="text-danger text-center mt-3 font-weight-bold">
                        Invalid Username or Password
                    </p>
                )}

                <div className="glass-footer-text">
                    Don't have a account <b onClick={registerNewUser}>Register</b>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;