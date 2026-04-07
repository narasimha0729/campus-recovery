import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../LoginComponent/LoginStyle.css";
import "../../DisplayView.css";
import { getUserId } from "../../Services/LoginService";
import { generateId, saveLostItem } from "../../Services/LostItemService";

const LostItemRegistration = () => {
  let navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [errors, setErrors] = useState({});
  let [newId, setNewId] = useState('');
  let [ldate, setLdate] = useState(new Date().toISOString().split('T')[0]);
  const [userId, setUserId] = useState("");
  const [lostItem, setLostItem] = useState({
    lostItemId: "",
    lostItemName: "",
    color: "",
    brand: "",
    category: "",
    location: "N/A",
    username: "",
    lostDate: "",
    status: false
  });

  const setLostItemId = () => {
    generateId().then(response => {
      setNewId(response.data);
    });
  };

  const setUsername = () => {
    getUserId().then(response => {
      setUserId(response.data);
    });
  };

  useEffect(() => {
    setLostItemId();
    setUsername();
    setFlag(false);
  }, []);

  const onChangeHandler = (event) => {
    setFlag(false);
    const { name, value } = event.target;
    setLostItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const lostItemSubmit = () => {
    const updatedLostItem = {
      ...lostItem,
      lostItemId: newId,
      username: userId,
      lostDate: ldate
    };

    saveLostItem(updatedLostItem).then(() => {
      setFlag(true);
    });
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!lostItem.lostItemName.trim()) {
      tempErrors.lostItemName = "Item description is required";
      isValid = false;
    }

    if (!lostItem.color.trim()) {
      tempErrors.color = "Color is required";
      isValid = false;
    }

    if (!lostItem.location.trim()) {
      tempErrors.location = "Missing location";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) {
      lostItemSubmit();
    }
  };

  const returnBack = () => {
    navigate("/student-menu");
  };

  const nextItem = () => {
    window.location.reload();
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh', padding: '20px' }}>
      <div className="form-card-premium">
        <div className="pill-container">
          <div className="form-header-pill">Lost and Found Report Form</div>
        </div>

        <div>
          <h2 className="section-title-modern">LOST ITEM DETAILS</h2>

          <form onSubmit={handleValidation}>
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label-small">Item description:</label>
                <input
                  name="lostItemName"
                  className="form-control premium-input"
                  value={lostItem.lostItemName}
                  onChange={onChangeHandler}
                />
                {errors.lostItemName && <small className="text-danger">{errors.lostItemName}</small>}
              </div>

              <div className="col-12 mt-3">
                <label className="form-label-small">Brand/Model (if applicable):</label>
                <input
                  name="brand"
                  className="form-control premium-input"
                  value={lostItem.brand}
                  onChange={onChangeHandler}
                />
              </div>

              <div className="col-6 mt-3">
                <label className="form-label-small">Color:</label>
                <input
                  name="color"
                  className="form-control premium-input"
                  value={lostItem.color}
                  onChange={onChangeHandler}
                />
                {errors.color && <small className="text-danger">{errors.color}</small>}
              </div>

              <div className="col-6 mt-3">
                <label className="form-label-small">Size (if applicable):</label>
                <input
                  name="category"
                  className="form-control premium-input"
                  value={lostItem.category}
                  onChange={onChangeHandler}
                />
              </div>

              <div className="col-12 mt-3" style={{ display: 'none' }}>
                {/* Hidden location to satisfy backend validation */}
                <label className="form-label-small">Location:</label>
                <input
                  name="location"
                  className="form-control premium-input"
                  value={lostItem.location || "N/A"}
                  onChange={onChangeHandler}
                />
              </div>

              <div className="col-12 mt-3">
                <label className="form-label-small">Date and time lost:</label>
                <input
                  type="date"
                  className="form-control premium-input w-50"
                  value={ldate}
                  onChange={(e) => setLdate(e.target.value)}
                />
              </div>

              <div className="col-12 mt-4">
                {flag ? (
                  <button type="button" onClick={nextItem} className="next-btn-yellow d-inline-flex">
                    New Submission
                  </button>
                ) : (
                  <button type="submit" className="next-btn-yellow d-inline-flex">
                    Next ➔
                  </button>
                )}
              </div>
            </div>
          </form>

          {flag && (
            <div className="alert alert-success mt-4 rounded-3 py-2 text-center" style={{ fontSize: '0.9rem' }}>
              ✅ Record saved successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LostItemRegistration;