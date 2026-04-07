import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../Services/LoginService";
import "../../theme.css";

const PersonalDetails = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        personlName: "",
        email: "",
        role: ""
    });

    useEffect(() => {
        getUser().then((response) => {
            setUser(response.data);
        }).catch(err => {
            console.error("Error fetching user details", err);
        });
    }, []);

    const returnBack = () => {
        if (user.role === 'Admin')
            navigate('/admin-menu');
        else if (user.role === 'Student')
            navigate('/student-menu');
    }

    return (
        <div className="premium-bg">
            <div className="theme-card">
                <h2 className="text-center mb-4">
                    {user.role} Personal Details
                </h2>

                <div className="detail-box">
                    <span className="detail-label">User Id / Username</span>
                    <div className="detail-value">{user.username || "Loading..."}</div>
                </div>

                <div className="detail-box">
                    <span className="detail-label">Personal Name</span>
                    <div className="detail-value">{user.personlName || "N/A"}</div>
                </div>

                <div className="detail-box">
                    <span className="detail-label">Email Address</span>
                    <div className="detail-value">{user.email || "N/A"}</div>
                </div>

                <div className="detail-box">
                    <span className="detail-label">Assigned Role</span>
                    <div className="detail-value">
                        <span style={{ 
                            color: user.role === 'Admin' ? '#e74c3c' : '#2ecc71',
                            fontWeight: '700'
                        }}>
                            {user.role}
                        </span>
                    </div>
                </div>

                <div className="text-center mt-5">
                    <button onClick={returnBack} className="theme-btn w-100">
                        Return to Menu
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PersonalDetails;
