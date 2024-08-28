import React from "react";
import Boards from "./Boards";
import Members from "./Members";
import './BoardsInProject.css'
import NavBar from "../navBar";

const BoardsInProject=()=>{
return(
    <>
    {/* <NavBar/> */}
    <div>
        <div style={{marginTop:"5px"}}>
            <Boards/>
        </div>
        <div >
            <Members/>    
        </div>
    </div>
    </>
)
}

export default BoardsInProject;