import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRole, getAllStudents, deleteUser } from "../../Services/LoginService.jsx";
import "../../DisplayView.css";

const StudentReport = () => {
    let navigate = useNavigate();
    const [studentList, setStudentList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const checkAuthAndFetch = async () => {
            try {
                const response = await getRole();
                const currentRole = (typeof response.data === 'string') ? response.data : "";
                if (currentRole.toLowerCase() !== 'admin') {
                    console.warn("Unauthorized access to Student Report. Role:", currentRole);
                    navigate('/');
                    return;
                }
                
                const res = await getAllStudents();
                if (res && Array.isArray(res.data)) {
                    setStudentList(res.data);
                } else {
                    console.error("Student list is not an array:", res.data);
                }
            } catch (err) {
                console.error("Error in StudentReport:", err);
            } finally {
                setLoading(false);
            }
        };

        checkAuthAndFetch();
    }, [navigate]);

    const handleDelete = (username) => {
        if (window.confirm(`Are you sure you want to delete user ${username}?`)) {
            deleteUser(username).then(() => {
                setStudentList(studentList.filter(user => user.username !== username));
                setMessage(`User ${username} deleted successfully.`);
                setTimeout(() => setMessage(""), 3000);
            }).catch(err => {
                console.error("Error deleting user:", err);
                alert("Failed to delete user.");
            });
        }
    };

    const returnBack = () => {
        navigate('/admin-menu');
    };

    if (loading) return <div className="text-center mt-5"><h3>Loading Students...</h3></div>;

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Registered Students List 🎓</h1>
            <hr style={{ height: "3px", backgroundColor: "green" }} />
            
            {message && <div className="alert alert-success">{message}</div>}

            <div className="table-responsive shadow-sm rounded">
                <table className="table table-hover table-bordered mb-0">
                    <thead className="table-success">
                        <tr>
                            <th>Username</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentList.length > 0 ? (
                            studentList.map((user) => (
                                <tr key={user.username}>
                                    <td><strong>{user.username}</strong></td>
                                    <td>{user.personlName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button 
                                            className="btn btn-danger btn-sm" 
                                            onClick={() => handleDelete(user.username)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4">No students found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="text-center mt-4 mb-5">
                <button onClick={returnBack} className="btn btn-secondary px-5">
                    Return to Menu
                </button>
            </div>
        </div>
    );
};

export default StudentReport;
