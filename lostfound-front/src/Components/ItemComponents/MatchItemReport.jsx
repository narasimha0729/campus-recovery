import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRole, getUser } from "../../Services/LoginService";
import { getAllMatchItems, getPotentialMatches, saveMatchItem } from "../../Services/MatchItemService";
import "../../DisplayView.css";

const MatchItemReport = () => {

  let navigate = useNavigate();
  const [itemList, setItemList] = useState([]);
  const [potentialList, setPotentialList] = useState([]);
  const [role, setRole] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("confirmed");

  const showMatchItems = () => {
    getRole().then((response) => {
      setRole(response.data);
      getUser().then((userRes) => {
          setCurrentUser(userRes.data);
      });
      
      getAllMatchItems().then((res) => {
        setItemList(res.data);
      }).catch(err => console.error("Error fetching match items", err));

      getPotentialMatches().then((res) => {
        setPotentialList(res.data);
      }).catch(err => console.error("Error fetching potential matches", err));
    }).catch(err => console.error("Error fetching role", err));
  };

  useEffect(() => {
    showMatchItems();
  }, []);

  const confirmMatch = (potentialMatch) => {
    saveMatchItem(potentialMatch).then(() => {
        alert("Match confirmed successfully!");
        showMatchItems();
    }).catch(err => alert("Failed to confirm match: " + err.message));
  };

  const returnBack = () => {
    if (role === 'Admin')
      navigate('/admin-menu');
    else if (role === 'Student')
      navigate('/student-menu');
  };

  return (
    <div className="container mt-4">
      <div className="text-center">
        {
          role === 'Admin'
            ? <h1 className="mb-4">Admin Matching Dashboard</h1>
            : <h1 className="mb-4">Student Matching Dashboard</h1>
        }
      </div>

      <div className="d-flex justify-content-center mb-4">
        <button 
          className={`btn me-2 ${activeTab === 'confirmed' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setActiveTab('confirmed')}
        >
          Confirmed Matches
        </button>
        <button 
          className={`btn ${activeTab === 'potential' ? 'btn-warning' : 'btn-outline-warning'}`}
          onClick={() => setActiveTab('potential')}
        >
          Potential Suggestions 🤖
        </button>
      </div>

      <hr style={{ height: "3px", backgroundColor: activeTab === 'confirmed' ? "green" : "orange" }} />

      <div className="row">
        {activeTab === 'confirmed' ? (
          <table className="table table-striped table-bordered shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Lost Item Id</th>
                <th>Found Item Id</th>
                <th>Item Name</th>
                <th>Category</th>
                <th>Lost Username</th>
                <th>Found Username</th>
              </tr>
            </thead>
            <tbody>
              {itemList.length > 0 ? (
                itemList
                .filter(item => {
                    if (role === 'Admin') return true;
                    if (!currentUser) return false;
                    return item.lostUsername === currentUser.username || item.foundUsername === currentUser.username;
                })
                .map((item) => (
                  <tr key={`${item.matchItemId.lostItemId}-${item.matchItemId.foundItemId}`}>
                    <td>{item.matchItemId.lostItemId}</td>
                    <td>{item.matchItemId.foundItemId}</td>
                    <td>{item.itemName}</td>
                    <td>{item.category}</td>
                    <td>{item.lostUsername}</td>
                    <td>{item.foundUsername}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">No confirmed matches yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <table className="table table-hover table-bordered shadow-sm">
            <thead className="table-warning">
              <tr>
                <th>Lost Item</th>
                <th>Found Item</th>
                <th>Category</th>
                <th>Users</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {potentialList.length > 0 ? (
                potentialList
                .filter(item => {
                    if (role === 'Admin') return true;
                    if (!currentUser) return false;
                    return item.lostUsername === currentUser.username || item.foundUsername === currentUser.username;
                })
                .map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="fw-bold">{item.itemName}</div>
                      <small className="text-muted">ID: {item.lostItemId}</small>
                    </td>
                    <td>
                      <div className="fw-bold text-success">{item.foundItemName || 'Match Found'}</div>
                      <small className="text-muted">ID: {item.foundItemId}</small>
                    </td>
                    <td>
                       <span className="badge bg-info text-dark">{item.category}</span>
                    </td>
                    <td>
                      <div>Lost by: <strong>{item.lostUsername}</strong></div>
                      <div>Found by: <strong>{item.foundUsername}</strong></div>
                    </td>
                    <td>
                      <button 
                        className="btn btn-sm btn-success w-100"
                        onClick={() => confirmMatch(item)}
                      >
                        Confirm Match
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">No potential suggestions found. Keep checking back!</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        <div className="mt-4 text-center">
          <button onClick={returnBack} className="btn btn-secondary px-5">
            Return to Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchItemReport;