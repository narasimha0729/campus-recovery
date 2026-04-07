import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logout, getAllUsers } from "../../Services/LoginService";
import { getAllLostItems } from "../../Services/LostItemService";
import { getAllFoundItems } from "../../Services/FoundItemService";
import "../../theme.css";
import "./LoginStyle.css";

const AdminMenu = () => {
    let navigate = useNavigate();
    const [stats, setStats] = useState({
        lost: 0,
        found: 0,
        users: 0
    });

    useEffect(() => {
        // Fetch all counts
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
                background: "rgba(108, 92, 231, 0.05)",
                backdropFilter: "blur(20px)",
                padding: "30px 20px",
                textAlign: "center",
                borderBottom: "1px solid rgba(255, 255, 255, 0.2)"
            }}>
                <h2 style={{
                    margin: 0,
                    fontWeight: "800",
                    fontSize: "2.5rem",
                    background: "linear-gradient(135deg, #2d3436, #6c5ce7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "-1.5px"
                }}>
                    Admin Dashboard 🛠️
                </h2>
                <p style={{ color: '#636e72', marginTop: '10px', fontSize: '1.1rem' }}>Manage users, items, and system settings</p>
            </div>

            {/* Navbar */}
            <Navbar
                expand="lg"
                className="px-4 py-3"
                style={{
                    background: "rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(12px)",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.03)"
                }}
            >
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto align-items-center">
                        <NavDropdown title={<b>Personal</b>} id="personal-dropdown" className="mx-2">
                            <NavDropdown.Item href="/personal-details">My Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/user-list">User Directory</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title={<b>Management</b>} id="mgmt-dropdown" className="mx-2">
                            <NavDropdown.Item href="/found-list">Found Items</NavDropdown.Item>
                            <NavDropdown.Item href="/lost-list">Lost Items</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/match-list">Match Reports</NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link href="/user-list" className="mx-2">
                            <b>Users 👥</b>
                        </Nav.Link>

                        <Nav.Link href="/match-list" className="mx-2">
                            <b>✅ Matched</b>
                        </Nav.Link>

                        <Nav.Link href="/chat" className="mx-2">
                            <b>💬 Chat</b>
                        </Nav.Link>
                    </Nav>

                    <button className="theme-btn" onClick={handleLogout} style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
                        Sign Out
                    </button>
                </Navbar.Collapse>
            </Navbar>

            {/* Main Content Area */}
            <div style={{ padding: "40px 40px", flex: 1 }}>
                <div className="container">
                    <div className="row g-4 justify-content-center">
                        <div className="col-lg-10 text-center">
                            <h3 style={{ fontWeight: '700', color: '#2d3436', marginBottom: '30px' }}>System Overview</h3>
                            
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

                            <p style={{ color: '#636e72', marginTop: '40px' }}>Select a category from the navigation bar to begin managing the Lost & Found system.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminMenu;