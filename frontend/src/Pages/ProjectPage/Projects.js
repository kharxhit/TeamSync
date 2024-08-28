import React, { useEffect, useState } from "react";
// import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { FiMoreVertical } from 'react-icons/fi';
import { IoIosAddCircleOutline } from 'react-icons/io'
import { Link } from "react-router-dom";
// import BoardsInProject from '../BoardsInProjectPage/BoardsInProject';
// import { useGlobalBoardContext } from "../../context/boardContext";
// import useOrgin from "../../hooks/useOrgin";


const Projects = () => {
    const [Projects, setProjects] = useState([]);
    const [pr, setPr] = useState();
    // const [newprojectId, setNewProjectId] = useState("");
    const [newProjectName, setNewProjectName] = useState("");
    const [newProjectDescription, setNewProjectDescription] = useState("");

    useEffect(() => {
        const fetchdata = async () => {
            let openOrg = JSON.parse(localStorage.getItem('user')).openOrg;
            // let temp = JSON.parse(localStorage.getItem('user').projects);
            let org = await fetch(`organisation/${openOrg.openOrgId}`);
            let orgss = await org.json();
            // console.log(orgss);            
            let projectss = orgss.projects;
            setProjects(projectss);
            // setPr(temp);
        }
        fetchdata();
    }, [Projects]);

    useEffect(() => {
        const data = async () => {
            let id = JSON.parse(localStorage.getItem('user'))._id;
            let temp = await fetch(`user/${id}`);
            let tempp = await temp.json();
            let projectss = tempp.projects;
            setPr(projectss)
            // console.log(pr);            
        }
        data();
        // console.log(id);        
    }, []);

    const addProject = async () => {
        // console.log(pr);        
        let tempProject;
        // let pr = JSON.parse(localStorage.getItem('user')).projects;
        await fetch('projects/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newProjectName,
                description: newProjectDescription,
                createdBy: JSON.parse(localStorage.getItem('user'))._id,
                orgId: JSON.parse(localStorage.getItem('user')).openOrg.openOrgId,
            })
        })
            .then(response => response.json())
            .then(async (result) => {
                tempProject = {
                    name: result.name,
                    description: result.description,
                    createdAt: result.createdAt,
                    _id: result._id
                }
                setProjects([...Projects, tempProject]);
                // console.log(Projects);                
            })
            .catch(error => {
                console.error('Error:', error);
            });


        fetch(`organisation/${JSON.parse(localStorage.getItem('user')).openOrg.openOrgId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "projects": [...Projects, tempProject] })
        })

        // console.log(Projects);

        fetch(`user/${JSON.parse(localStorage.getItem('user'))._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "projects": [...pr, tempProject._id] })
        })

        // console.log("Hey3");


        const a = JSON.parse(localStorage.user)
        a.projects = [...pr, tempProject._id];
        localStorage.user = JSON.stringify(a);

        setNewProjectName("");
        setNewProjectDescription("");
        // console.log("hey4");        

    }

    async function updateuser(project) {


        const a = JSON.parse(localStorage.user)
        // a.openOrg = organisation._id;
        a.openProject = {
            openProjectId: project._id,
            openProjectName: project.name
        }
        localStorage.user = JSON.stringify(a);
        // console.log(a)
        window.location.reload()

        await fetch(`user/${JSON.parse(localStorage.getItem('user'))._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "openProject": {
                    "openProjectId": project._id,
                    "openProjectName": project.name
                }
            })
        })
            .then(response => response.json())
            .then(async (result) => {
                console.log("Success!");
            })
            .catch(error => {
                console.log(error);
            });

        // console.log("Here");


    }

    return (
        <>
            <div>
                <div style={{ display: "flex", height: "10vh", alignItems: "center", backgroundColor: "#f1f1f1", boxShadow: "2px 2px 5px rgba(0,0,0,0.10)", }}>
                    <div style={{ width: "0.7%", backgroundColor: "blue", marginRight: "8px", borderRadius: "20%" }}>.</div>
                    <h3>Projects</h3>
                </div>
                <div style={{ display: "flex", overflowX: "auto" }}>
                    <div className="board-details" data-bs-toggle="modal" data-bs-target="#Create-Board" onClick={() => { }} style={{ width: "28%", fontSize: "150%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f1f1f1" }}>
                        <IoIosAddCircleOutline /> <p>New Project</p>
                    </div>
                    <div class="modal fade" id="Create-Board" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">New Project</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="mb-3 row">
                                        <label for="inputName" class="col-sm-12 col-form-label">Name of Project:</label>
                                        <div class="col">
                                            <input type="text" readonly class="form-control-plaintext" id="inputName" onChange={e => setNewProjectName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="mb-3 row">
                                        <label for="inputDescription" class="col-sm-12 col-form-label">Description of Project</label>
                                        <div class="col">
                                            <input type="text" class="form-control" id="inputdescription" onChange={e => setNewProjectDescription(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={addProject}>Add Project</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {Projects && Projects.map((project) => (
                        <div className="board-details" style={{ width: "28%" }} onClick={updateuser.bind(this, project)} >
                            <Link style={{ textDecoration: "none" }} to="/board" >
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                                    <h4>{project.name}</h4>
                                </div>
                                <p style={{overflow:"hidden "}}><strong>Creator: </strong>{project.description}</p>
                                {/* <p>{formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}</p> */}
                                <span className="material-symbols-outlined" onClick={() => { }}><FiMoreVertical /></span>
                            </Link>
                        </div>

                    ))}
                </div>
            </div>
        </>
    )


}
export default Projects;