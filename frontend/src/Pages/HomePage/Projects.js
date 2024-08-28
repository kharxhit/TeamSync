import React, { useEffect, useState } from "react";


const Projects=()=>{
    const [projects,setProjects]=useState();

    useEffect(() => {
        const fetchdata=async() => {
            proj=await fetch('/project/')
            proj=await proj.json();
            if(!proj) console.log("No Projects")
            if(proj.ok){
                setProjects(proj);
            }
        }
        fetchdata();
    },[])
    return (
        <>
        <div>
            <div style={{ display: "flex", height: "10vh", alignItems: "center", backgroundColor:"#f1f1f1",boxShadow: "2px 2px 5px rgba(0,0,0,0.10)",}}>
                    <div style={{ width: "0.7%", backgroundColor: "blue", marginRight: "8px", borderRadius: "20%" }}>.</div>
                    <h3>Projects</h3>
            </div>
        </div>
        </>
    )
}
export default Projects;