import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRole, getAllUsers, deleteUser } from "../../Services/LoginService";
import "../../DisplayView.css";

const UserReport = () => {
    let navigate = useNavigate();
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (loading) setLoading(false);
        }, 10000);

        getRole().then((response) => {
            const currentRole = (typeof response.data === 'string') ? response.data : "";
            if (currentRole.toLowerCase() !== 'admin') {
                console.warn("Unauthorized access to User List. Role:", currentRole);
                navigate('/');
            } else {
                getAllUsers().then((res) => {
                    clearTimeout(timeout);
                    if (res && Array.isArray(res.data)) {
                        setUserList(res.data);
                    } else {
                        console.error("User list is not an array:", res.data);
                    }
                    setLoading(false);
                }).catch((err) => {
                    console.error("Error fetching users:", err);
                    setLoading(false);
                });
            }
        }).catch((err) => {
            console.error("Error fetching role:", err);
            setLoading(false);
        });

        return () => clearTimeout(timeout);
    }, [navigate, loading]);

    const handleDelete = (username) => {
        if (window.confirm(`Are you sure you want to delete user ${username}?`)) {
            deleteUser(username).then(() => {
                setUserList(userList.filter(user => user.username !== username));
                alert(`User ${username} deleted successfully.`);
            }).catch(err => {
                console.error("Error deleting user:", err);
                alert("Failed to delete user.");
            });
        }
    };

    const returnBack = () => {
        navigate('/admin-menu');
    };

    if (loading) return <div className="text-center mt-5"><h3>Loading Users...</h3></div>;

    return (
        <div className="theme-layout py-5">
            <div className="container shadow-premium p-5 rounded-4" style={{ backgroundColor: 'var(--card-bg)', backdropFilter: 'blur(16px)', border: '1px solid var(--glass-border)' }}>
                <div className="text-center mb-5">
                    <h2 className="mb-2">Registered Users List 👥</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Manage and view all registered students and administrators</p>
                </div>
                
                <div className="table-responsive rounded-4 mt-4 overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
                    <table className="table table-hover mb-0">
                        <thead style={{ background: 'rgba(108, 92, 231, 0.05)' }}>
                            <tr>
                                <th className="py-3 px-4">Username</th>
                                <th className="py-3 px-4">Full Name</th>
                                <th className="py-3 px-4">Email</th>
                                <th className="py-3 px-4">Role</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.length > 0 ? (
                                userList.map((user) => (
                                    <tr key={user.username} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                                        <td className="py-3 px-4"><strong>{user.username}</strong></td>
                                        <td className="py-3 px-4">{user.personlName}</td>
                                        <td className="py-3 px-4">{user.email}</td>
                                        <td className="py-3 px-4">
                                            <span style={{ 
                                                padding: '6px 12px', 
                                                borderRadius: '50px', 
                                                fontSize: '0.85rem',
                                                fontWeight: '600',
                                                background: user.role === 'Admin' ? 'rgba(231, 76, 60, 0.1)' : 'rgba(46, 204, 113, 0.1)',
                                                color: user.role === 'Admin' ? '#e74c3c' : '#2ecc71'
                                            }}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4"><span style={{ color: '#2ecc71', fontWeight: '600' }}>● Active</span></td>
                                        <td className="py-3 px-4">
                                            <button 
                                                className="btn btn-outline-danger btn-sm px-3" 
                                                style={{ borderRadius: '50px', fontSize: '0.85rem' }}
                                                onClick={() => handleDelete(user.username)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-5">No users found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="text-center mt-5">
                    <button onClick={returnBack} className="secondary-btn px-5">
                        Return to Menu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserReport;
