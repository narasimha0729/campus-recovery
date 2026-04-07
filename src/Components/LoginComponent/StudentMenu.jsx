import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logout, getAllUsers } from "../../Services/LoginService";
import { getAllLostItems } from "../../Services/LostItemService";
import { getAllFoundItems } from "../../Services/FoundItemService";
import "./LoginStyle.css";

const StudentMenu = () => {
    let navigate = useNavigate();
    const [stats, setStats] = useState({
        lost: 0,
        found: 0,
        users: 0
    });

    useEffect(() => {
        Promise.all([
            getAllLostItems(),
            getAllFoundItems(),
            getAllUsers()
        ]).then(([lostRes, foundRes, usersRes]) => {
            setStats({
                lost: Array.isArray(lostRes.data) ? lostRes.data.length : 0,
                found: Array.isArray(foundRes.data) ? foundRes.data.length : 0,
                users: Array.isArray(usersRes.data) ? usersRes.data.length : 0
            });
        }).catch(err => console.error("Error fetching stats:", err));
    }, []);

    const handleLogout = () => {
        logout().then(() => {
            localStorage.clear();
            sessionStorage.clear();
            navigate('/');
        })
    };

    return (
        <div className="theme-layout">
            {/* Header */}
            <div style={{
                background: "rgba(45, 52, 54, 0.9)",
                backdropFilter: "blur(8px)",
                padding: "20px",
                textAlign: "center",
                color: "white"
            }}>
                <h2 style={{
                    margin: 0,
                    fontWeight: "700",
                    letterSpacing: "1px",
                    fontSize: "2rem"
                }}>
                    Lost & Found Student Dashboard 🎓
                </h2>
            </div>

            {/* Navbar */}
            <Navbar
                expand="lg"
                style={{
                    background: "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(10px)",
                    padding: "15px 40px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
                }}
            >
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto align-items-center">
                        <NavDropdown title={<b>Personal</b>} id="personal-dropdown" className="mx-2">
                            <NavDropdown.Item href="/student-show">My Profile</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title={<b>Lost Item</b>} id="lost-dropdown" className="mx-2">
                            <NavDropdown.Item href="/lost-entry">Report Lost Item</NavDropdown.Item>
                            <NavDropdown.Item href="/lost-list">View Lost Items</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title={<b>Found Item</b>} id="found-dropdown" className="mx-2">
                            <NavDropdown.Item href="/found-entry">Report Found Item</NavDropdown.Item>
                            <NavDropdown.Item href="/found-list">View Found Items</NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link href="/match-list" className="mx-2">
                            <b>✅ Matched</b>
                        </Nav.Link>

                        <Nav.Link href="/chat" className="mx-2">
                            <b>💬 Chat</b>
                        </Nav.Link>
                    </Nav>

                    <button className="theme-btn" onClick={handleLogout}>
                        Sign Out
                    </button>
                </Navbar.Collapse>
            </Navbar>

            {/* Content area with stats */}
            <div style={{ padding: "40px", flex: 1 }}>
                <div className="container">
                    <div className="text-center mb-5">
                        <h3 style={{ fontWeight: '700', color: '#2d3436' }}>Campus Activity</h3>
                    </div>

                    <div className="stats-container">
                        <div className="stat-card">
                            <div className="stat-icon">📦</div>
                            <div className="stat-value">{stats.lost}</div>
                            <div className="stat-label">Total Lost Items</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">🔍</div>
                            <div className="stat-value">{stats.found}</div>
                            <div className="stat-label">Total Found Items</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">👤</div>
                            <div className="stat-value">{stats.users}</div>
                            <div className="stat-label">Total Users</div>
                        </div>
                    </div>

                    <div className="text-center mt-5">
                        <p style={{ color: '#636e72', maxWidth: '600px', margin: '0 auto' }}>
                            Help your fellow students! Report any found items or search the list if you've lost something.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentMenu;