import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFoundItemById } from "../../Services/FoundItemService";
import { getLostItemByFoundItem } from "../../Services/LostItemService";
import { saveMatchItem } from "../../Services/MatchItemService";
import "../../DisplayView.css";

const MatchFoundItemSearch = () => {

    let navigate = useNavigate();
    const param = useParams();

    const role = localStorage.getItem("role");

    const [flag, setFlag] = useState(false);

    const [foundItem, setFoundItem] = useState({
        foundItemId: "",
        foundItemName: "",
        color: "",
        brand: "",
        category: "",
        location: "",
        username: "",
        foundDate: "",
        status: false,
    });

    const [lostItemDTOList, setLostItemDTOList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let matchItem = {
        lostItemId: "",
        foundItemId: "",
        itemName: "",
        category: "",
        lostUsername: "",
        foundUsername: ""
    };

    const showLostItems = () => {
        setLoading(true);
        setError(null);

        const p1 = getFoundItemById(param.foundItemId)
            .then((response) => {
                setFoundItem(response.data);
            })
            .catch(err => {
                console.error("Error fetching found item:", err);
                setError("Failed to load found item details.");
            });

        const p2 = getLostItemByFoundItem(param.foundItemId)
            .then((response) => {
                setLostItemDTOList(response.data);
            })
            .catch(err => {
                console.error("Error fetching matching lost items:", err);
                setError("Failed to load matching lost items.");
            });

        Promise.all([p1, p2]).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        showLostItems();
    }, [param.foundItemId]);

    const returnBack = () => {
        navigate('/found-list');
    }

    const claimItem = (lostItemId, lostUser) => {

        matchItem.lostItemId = lostItemId;
        matchItem.foundItemId = foundItem.foundItemId;
        matchItem.itemName = foundItem.foundItemName;
        matchItem.category = foundItem.category;
        matchItem.lostUsername = lostUser;
        matchItem.foundUsername = foundItem.username;

        saveMatchItem(matchItem).then(() => {
            setFlag(true);
        });
    }

    if (loading) return <div className="text-center mt-5"><h3>Loading match details...</h3></div>;
    if (error) return (
        <div className="text-center mt-5">
            <h3 className="text-danger">{error}</h3>
            <button className="btn btn-primary mt-3" onClick={showLostItems}>Retry</button>
            <button className="btn btn-secondary mt-3 ms-2" onClick={returnBack}>Go Back</button>
        </div>
    );

    return (
        <div className="text-center">
            <div>

                <h2 className="text-center">Search for Matching Lost Items</h2>

                <hr style={{ height: "3px", borderWidth: 0, color: "green", backgroundColor: "green" }} />

                <div className="row">
                    <h3 className="text-start ms-4">Selected Found Item:</h3>
                    <table className="table table-striped table-bordered mx-4" style={{width: "95%"}}>
                        <thead>
                            <tr>
                                <th>Item Id</th>
                                <th>Item Name</th>
                                <th>Category</th>
                                <th>Color</th>
                                <th>Brand</th>
                                <th>Location</th>
                                <th>Found Date</th>
                                <th>Finder</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{foundItem.foundItemId}</td>
                                <td>{foundItem.foundItemName}</td>
                                <td>{foundItem.category}</td>
                                <td>{foundItem.color}</td>
                                <td>{foundItem.brand}</td>
                                <td>{foundItem.location}</td>
                                <td>{foundItem.foundDate}</td>
                                <td>{foundItem.username}</td>
                            </tr>
                        </tbody>
                    </table>

                    <br />

                    <h3 className="text-start ms-4 mt-4">Probable Matching Lost Item List:</h3>

                    <table className="table table-striped table-bordered mx-4" style={{width: "95%"}}>

                        <thead>
                            <tr>
                                <th>Item Id</th>
                                <th>Item Name</th>
                                <th>Category</th>
                                <th>Color</th>
                                <th>Brand</th>
                                <th>Location</th>
                                <th>Lost Date</th>
                                <th>User Id</th>
                                <th>Select</th>
                            </tr>
                        </thead>

                        <tbody>

                            {
                                lostItemDTOList.map((item) => (
                                    <tr key={item.lostItemId}>

                                        <td>{item.lostItemId}</td>
                                        <td>{item.lostItemName}</td>
                                        <td>{item.category}</td>
                                        <td>{item.color}</td>
                                        <td>{item.brand}</td>
                                        <td>{item.location}</td>
                                        <td>{item.lostDate}</td>
                                        <td>{item.username}</td>

                                        <td>
                                            <button
                                                style={{ marginLeft: "10px" }}
                                                className="btn btn-warning"
                                                onClick={() => claimItem(item.lostItemId, item.username)}
                                            >
                                                Match & Claim
                                            </button>
                                        </td>

                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>

                    <br />

                    <div className="form-group mb-4">
                        <button
                            style={{ marginLeft: "10px" }}
                            onClick={() => returnBack()}
                            className="btn btn-success"
                        >
                            Return
                        </button>
                    </div>

                </div>

                {flag && <p style={{ color: "blue", fontWeight: "bold", fontSize: "20px" }}> Item Matched and Recorded successfully!</p>}

            </div>
        </div>
    );
};

export default MatchFoundItemSearch;
