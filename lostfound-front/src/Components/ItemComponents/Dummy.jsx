import React, {useEffect } from "react";
import {useNavigate,useParams } from 'react-router-dom';
const Dummy=()=>{
    let navigate=useNavigate();
    const param = useParams();
    useEffect(() => {
      if(param.no==='1')
        navigate('/lost-entry');
      else if(param.no==='2')
        navigate('/found-entry')
      }, []);
 
};
export default Dummy;