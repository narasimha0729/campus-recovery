import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLostItemById } from "../../Services/LostItemService";
import { getFoundItemByLostItem } from "../../Services/FoundItemService";
import { saveMatchItem } from "../../Services/MatchItemService";
import "../../DisplayView.css";

const MatchItemSearch = () => {

let navigate = useNavigate();
const param = useParams();

const role = localStorage.getItem("role");

const [flag, setFlag] = useState(false);

const [lostItem, setLostItem] = useState({
    lostItemId: "",
    lostItemName: "",
    color: "",
    brand: "",
    category: "",
    location: "",
    username: "",
    lostDate: "",
    status: false,
});

const [itemList, setItemList] = useState([]);

const [foundItemDTOList, setFoundItemDTOList] = useState([]);

let matchItem = {
    lostItemId: "",
    foundItemId: "",
    itemName: "",
    category: "",
    lostUsername: "",
    foundUsername: ""
};

const showFoundItems = () => {

    getLostItemById(param.bid).then((response) => {
        setLostItem(response.data);
        setItemList([response.data]);
    });

    getFoundItemByLostItem(param.bid).then((response) => {
        setFoundItemDTOList(response.data);
    });
}

useEffect(() => {
    showFoundItems();
}, []);

const returnBack = () => {
    navigate('/lost-list');
}

const claimItem = (foundItemId, foundUser) => {

    matchItem.lostItemId = lostItem.lostItemId;
    matchItem.foundItemId = foundItemId;
    matchItem.itemName = lostItem.lostItemName;
    matchItem.category = lostItem.category;
    matchItem.lostUsername = lostItem.username;
    matchItem.foundUsername = foundUser;

    saveMatchItem(matchItem).then(() => {
        setFlag(true);
    });
}

return(
<div className="text-center">
<div>

{
role==='Admin'? <h2 className="text-center">Student's Lost Item List</h2>: <h2 className="text-center">Student Lost Item List</h2>
}

<hr style={{height: "3px", borderWidth:0, color:"yellow", backgroundColor:"red"}}/>

<div className = "row">

<table className = "table table-striped table-bordered">

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
<th>Status</th>
</tr>
</thead>

<tbody>

{
itemList.map((item) => (
<tr key = {item.lostItemId}>
<td>{item.lostItemId}</td>
<td>{item.lostItemName}</td>
<td>{item.category}</td>
<td>{item.color}</td>
<td>{item.brand}</td>
<td>{item.location}</td>
<td>{item.lostDate}</td>
<td>{item.username}</td>

{
item.status ? <td style={{color:'blue'}}>Found</td>: <td style={{color:'red'}}>Not Found</td>
}

</tr>
))
}

</tbody>
</table>

<br/>

<div>

<h2 className="text-center">Probable Matching Found Item List</h2>

<hr style={{ height: "3px", borderWidth: 0, color: "yellow", backgroundColor: "red" }} />

<div className="row">

<table className = "table table-striped table-bordered">

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
<th>Status</th>
<th>Select</th>
</tr>
</thead>

<tbody>

{
foundItemDTOList.map((item) => (
<tr key={item.foundItemId}>

<td>{item.foundItemId}</td>
<td>{item.foundItemName}</td>
<td>{item.category}</td>
<td>{item.color}</td>
<td>{item.brand}</td>
<td>{item.location}</td>
<td>{item.foundDate}</td>
<td>{item.username}</td>

<td>Not Returned</td>

<td>
<button
style={{marginLeft: "10px"}}
className="btn btn-warning"
onClick={()=>claimItem(item.foundItemId,item.username)}
>
Claim
</button>
</td>

</tr>
))
}

</tbody>
</table>

<br/>

<div className = "form-group">
<button
style={{marginLeft: "10px"}}
onClick={()=>returnBack()}
className="btn btn-success"
>
Return
</button>
</div>

</div>

{flag && <p style={{ color: "blue" }}> Item Claimed .....</p>}

</div>
</div>
</div>
</div>
);
};

export default MatchItemSearch;