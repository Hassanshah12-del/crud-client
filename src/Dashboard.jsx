import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
const [suc,setSuc] = useState()
const navigate =useNavigate()
axios.defaults.withCredentials = true;
useEffect(()=>{
    axios.get("http://localhost:3002/dashboard")
    .then(res => {
       if(res.data === "Success"){
            setSuc("Success OK")
       }
       else{
        navigate("/home")
       }
    }).catch(err => console.log(err))  
},[])
    return ( 
        <div>
            <h2>Dashboard</h2>
             <p>{suc}</p>
        </div>
        
     );
}

export default Dashboard;