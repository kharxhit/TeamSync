import React from "react";
import Projects from "./Projects";
import Members from "./Members";
import './Project.css'
import NavBar from "../navBar";

const Project=()=>{
return(
    <>
    {/* <NavBar/> */}
    <div>
        <div style={{marginTop:"5px"}}>
            <Projects/>
        </div>
        <div >
            <Members/>    
        </div>
    </div>
    </>
)
}

export default Project;