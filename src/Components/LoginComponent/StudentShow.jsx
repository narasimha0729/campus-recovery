import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../Services/LoginService";
import "../../DisplayView.css";

const StudentShow = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        personlName: "",
        email: ""
    });

    useEffect(() => {
        getUser().then((response) => {
            setUser(response.data);
        }).catch(err => {
            console.error("Error fetching user details", err);
        });
    }, []);

    const returnBack = () => {
        navigate('/student-menu');
    }

    return (
        <div className="theme-layout container d-flex flex-column align-items-center justify-content-center">
            <div className="theme-card shadow-lg mx-auto" style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>
                <h2>Student Personal Details</h2>
                
                <div className="mt-4 text-start">
                    <div className="mb-4 p-3 rounded" style={{ backgroundColor: "rgba(108, 92, 231, 0.05)", borderLeft: "4px solid #6c5ce7" }}>
                        <div style={{ fontWeight: "600", fontSize: "0.9rem", color: "#6c5ce7", marginBottom: "4px" }}>User Id</div>
                        <div style={{ fontSize: "1.2rem", fontWeight: "500", color: "#2d3436" }}>{user.username || "Loading..."}</div>
                    </div>
                    
                    <div className="mb-4 p-3 rounded" style={{ backgroundColor: "rgba(108, 92, 231, 0.05)", borderLeft: "4px solid #6c5ce7" }}>
                        <div style={{ fontWeight: "600", fontSize: "0.9rem", color: "#6c5ce7", marginBottom: "4px" }}>Personal Name</div>
                        <div style={{ fontSize: "1.2rem", fontWeight: "500", color: "#2d3436" }}>{user.personlName || "N/A"}</div>
                    </div>
                    
                    <div className="mb-4 p-3 rounded" style={{ backgroundColor: "rgba(108, 92, 231, 0.05)", borderLeft: "4px solid #6c5ce7" }}>
                        <div style={{ fontWeight: "600", fontSize: "0.9rem", color: "#6c5ce7", marginBottom: "4px" }}>Email</div>
                        <div style={{ fontSize: "1.2rem", fontWeight: "500", color: "#2d3436" }}>{user.email || "N/A"}</div>
                    </div>
                </div>

                <div className="mt-4">
                    <button 
                        onClick={returnBack} 
                        className="theme-btn w-100"
                    >
                        Return to Menu
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StudentShow;
