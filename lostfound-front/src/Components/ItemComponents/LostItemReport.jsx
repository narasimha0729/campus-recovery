//import React from "react";

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getRole } from "../../Services/LoginService";
import { getAllLostItems, getLostItemsByUsername } from "../../Services/LostItemService";
import "../../DisplayView.css";
/** 
import {useNavigate} from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logoutUser } from "../../Services/LoginService"; */

const LostItemReport=()=>{

let navigate = useNavigate();
    const [itemList,setItemList] = useState([]);
    const [role,setRole]=useState("");
 
const showLostItems=()=>{
      getRole().then((response)=>{
          setRole(response.data);
          if(response.data==='Admin'){
            getAllLostItems().then((res1)=>{
              setItemList(res1.data);
           });
          }
          else if (response.data==='Student'){
            getLostItemsByUsername().then((res2)=>{
              setItemList(res2.data);
           });
          }
        });
    }
    useEffect(() => {
       showLostItems();
    }, []);
 
 
const returnBack=()=>{
      if(role==='Admin')
         navigate('/admin-menu');
      else if(role==='Student')
        navigate('/student-menu');
  }
 
return(
  <div className="text-center">
    <div>
    {
      role==='Admin'? <h2 className="text-center">Admin Lost Item List</h2>: <h2 className="text-center">Student Lost Item List</h2>
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
            {
               role==='Student'?  <th>Search</th> : <span/>
            }
           </tr>
        </thead>
        <tbody>
        {
          itemList.map((item, index) => (
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
             {
               role==='Student'? <td> <Link to={`/search/${item.lostItemId}`}><button style={{marginLeft: "10px"}} className="btn btn-warning">Search Find Item</button></Link></td> : <span/>
            }
           </tr>
         ))}                        
        </tbody>
       </table>
        <br/>
        <div className = "form-group">  
        <button style={{marginLeft: "10px"}} onClick={()=>returnBack()} className="btn btn-success">Return</button>    
        </div>  
      </div>
    </div>
   </div>
 );
 
}
export default LostItemReport;