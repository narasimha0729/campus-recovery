import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { registerNewUser } from "../../Services/LoginService";
import './LoginStyle.css';

const RegisterUser = () => {

    const [lostFoundUser, setLostFoundUser] = useState({
        username: "",
        password: "",
        personlName: "",
        email: "",
        role: "",
    });
    const [flag, setFlag] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    let navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const createNewUser = (event) => {
        event.preventDefault();
        if (lostFoundUser.password === confirmPassword) {
            registerNewUser(lostFoundUser)
                .then((response) => {
                    setFlag(true);
                    setErrors({});
                })
                .catch((error) => {
                    console.error('Registration error', error);
                    setFlag(false);
                    setErrors({ submit: 'Registration failed. Please check your values and try again.' });
                });
        } else {
            setErrors({ ...errors, password: 'Both the passwords are not matched' });
        }
    };
    useEffect(() => {
        setFlag(false);
    }, []);

    const onChangeHandler = (event) => {
        event.persist();
        setFlag(false);
        const name = event.target.name;
        const value = event.target.value;
        setLostFoundUser(values => ({ ...values, [name]: value }));
    };

    const returnBack = () => {
        navigate('/');
    }
    const handleValidation = (event) => {
        event.preventDefault();
        let tempErrors = {};
        let isValid = true;

        if (!lostFoundUser.username.trim()) {
            tempErrors.username = "User Name is required";
            isValid = false;
        }

        if (!lostFoundUser.password.trim()) {
            tempErrors.password = "Password is required";
            isValid = false;
        }
        else if (lostFoundUser.password.length < 5 || lostFoundUser.password.length > 10) {
            tempErrors.password = "Password must be 5-10 characters long";
            isValid = false;
        }
        else if (lostFoundUser.password !== confirmPassword) {
            tempErrors.password = "Both the passwords are not matched";
            isValid = false;
        }

        if (!lostFoundUser.personlName.trim()) {
            tempErrors.personlName = "Full Name is required";
            isValid = false;
        }
        if (!lostFoundUser.email.trim()) {
            tempErrors.email = "Email is required";
            isValid = false;
        }
        else if (!emailPattern.test(lostFoundUser.email)) {
            tempErrors.email = "Invalid Email Format";
            isValid = false;
        }
        if (!lostFoundUser.role.trim()) {
            tempErrors.role = "Role is required";
            isValid = false;
        }
        if (!confirmPassword.trim()) {
            tempErrors.confirmPassword = "Confirm Password is required";
            isValid = false;
        }

        setErrors(tempErrors);
        if (isValid) {
            createNewUser(event);
        }
    };
    return (
        <div className="glass-container">
            <div className="glass-card" style={{ maxWidth: '450px', padding: '2rem 3rem' }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Create Account ✨</h2>

                <form>
                    <div className="glass-input-group" style={{ marginBottom: '1rem' }}>
                        <label>Username</label>
                        <input
                            placeholder="Enter username"
                            name="username"
                            className="glass-input"
                            value={lostFoundUser.username}
                            onChange={onChangeHandler}
                        />
                        {errors.username && (
                            <small className="text-danger mt-1 d-block">{errors.username}</small>
                        )}
                    </div>

                    <div className="glass-input-group" style={{ marginBottom: '1rem' }}>
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Create password"
                            name="password"
                            className="glass-input"
                            value={lostFoundUser.password}
                            onChange={onChangeHandler}
                        />
                        {errors.password && (
                            <small className="text-danger mt-1 d-block">{errors.password}</small>
                        )}
                    </div>

                    <div className="glass-input-group" style={{ marginBottom: '1rem' }}>
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Re-enter password"
                            name="confirmPassword"
                            className="glass-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {errors.confirmPassword && (
                            <small className="text-danger mt-1 d-block">{errors.confirmPassword}</small>
                        )}
                    </div>

                    <div className="glass-input-group" style={{ marginBottom: '1rem' }}>
                        <label>Full Name</label>
                        <input
                            placeholder="Enter your full name"
                            name="personlName"
                            className="glass-input"
                            value={lostFoundUser.personlName}
                            onChange={onChangeHandler}
                        />
                        {errors.personlName && (
                            <small className="text-danger mt-1 d-block">{errors.personlName}</small>
                        )}
                    </div>

                    <div className="glass-input-group" style={{ marginBottom: '1rem' }}>
                        <label>Email</label>
                        <input
                            placeholder="Enter email"
                            name="email"
                            className="glass-input"
                            value={lostFoundUser.email}
                            onChange={onChangeHandler}
                        />
                        {errors.email && (
                            <small className="text-danger mt-1 d-block">{errors.email}</small>
                        )}
                    </div>

                    <div className="glass-input-group mb-4" style={{ marginBottom: '1.5rem' }}>
                        <label>Select Role</label>
                        <select
                            name="role"
                            className="glass-input"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#fff' }}
                            value={lostFoundUser.role}
                            onChange={onChangeHandler}
                        >
                            <option value="" style={{ color: '#000' }}>Select Role</option>
                            <option value="Student" style={{ color: '#000' }}>Student</option>
                            <option value="Admin" style={{ color: '#000' }}>Admin</option>
                        </select>
                        {errors.role && (
                            <small className="text-danger mt-1 d-block">{errors.role}</small>
                        )}
                    </div>

                    <button
                        type="button"
                        className="glass-btn w-100"
                        onClick={handleValidation}
                    >
                        Register
                    </button>

                    {errors.submit && (
                        <div className="text-danger text-center mt-3 font-weight-bold">{errors.submit}</div>
                    )}
                </form>

                {flag && (
                    <div className="text-center mt-4">
                        <p style={{ color: '#4ade80', fontWeight: 'bold' }}>
                            Account Created Successfully 🎉
                        </p>
                        <button
                            className="btn btn-outline-light w-100 mt-2 rounded-pill"
                            onClick={returnBack}
                        >
                            Go To Login
                        </button>
                    </div>
                )}

                <div className="glass-footer-text" style={{ marginTop: '1.5rem' }}>
                    Already have an account? <b onClick={returnBack} style={{ cursor: 'pointer' }}>Login</b>
                </div>

            </div>
        </div>
    );
}
export default RegisterUser;
