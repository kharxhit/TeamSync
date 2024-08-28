import React from "react";
import Organisation from "./Organisation";
import Invites from "./Invites";
import './Landing.css'
import NavBar from "../navBar";

const Landing=()=>{
return(
    <>
    {/* <NavBar/> */}
    <div>
        <div style={{marginTop:"5px"}}>
            <Organisation/>
        </div>
        {/* <div >
            <Invites/>    
        </div> */}
    </div>
    </>
)
}

export default Landing;