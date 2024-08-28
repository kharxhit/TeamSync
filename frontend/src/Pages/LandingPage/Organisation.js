import React, { useEffect, useState } from "react";
import { FiMoreVertical } from 'react-icons/fi';
import { IoIosAddCircleOutline } from 'react-icons/io'
import {  Link } from "react-router-dom";


const Organisation = () => {
    const [orgs, setorgs] = useState();
    const [newOrgName, setNewOrgName] = useState("");
    const [newOrgImage, setNewOrgImage] = useState("");

    
    
    const [id,setId] = useState(null);

     const handleDelete = async (e) => {
        await fetch(`organisation/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        await fetch(`user/${JSON.parse(localStorage.getItem('user'))._id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"orgId": `${id}`})
        })
        const a = JSON.parse(localStorage.user)
        await a.orgs.splice(id,1)
        localStorage.user = JSON.stringify(a)
        document.location.reload()
    }

    const handleEdit = async () => {
        await fetch(`organisation/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' }
        })
    }

    useEffect(() => {

        const org = JSON.parse(localStorage.getItem('user')).orgs
        setorgs(org);

    }, [orgs]);



    async function updateuser(organisation) {

        const a = JSON.parse(localStorage.user)
        a.openOrg = {
            openOrgId: organisation._id,
            openOrgName: organisation.name
        }
        localStorage.user = JSON.stringify(a);
        window.location.reload()

        await fetch(`user/${JSON.parse(localStorage.getItem('user'))._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "openOrg": {
                    "openOrgId": organisation._id,
                    "openOrgName": organisation.name
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
    }

    const addOrg = async () => {
        const temporg = await fetch('organisation/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newOrgName,
                image: newOrgImage,
                createdBy: JSON.parse(localStorage.getItem('user'))._id,
            })
        })
        const data = await temporg.json()
        console.log(data)
        setorgs([...orgs,data])

        fetch(`user/${JSON.parse(localStorage.getItem('user'))._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "orgs": [...orgs, temporg] })
        })

        let temp = await fetch(`organisation/${data._id}`);
        let tempOrg = await temp.json();
        let members = tempOrg.members;

        let newMemberAcceptObj = {
            name: JSON.parse(localStorage.getItem('user')).name,
            email: JSON.parse(localStorage.getItem('user')).email,
            image: JSON.parse(localStorage.getItem('user')).image,
            _id: JSON.parse(localStorage.getItem('user'))._id
        }

        await fetch(`organisation/${data._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "members": [...members, newMemberAcceptObj] })
        })

        const a = JSON.parse(localStorage.user)
        a.orgs = [...orgs, data];
        localStorage.user = JSON.stringify(a);

        setNewOrgName("");
        setNewOrgImage("");

    }

    return (
        <>
            <div>
                <div style={{ display: "flex", height: "10vh", alignItems: "center", backgroundColor: "#f1f1f1", boxShadow: "2px 2px 5px rgba(0,0,0,0.10)", }}>
                    <div style={{ width: "0.7%", backgroundColor: "blue", marginRight: "8px", borderRadius: "20%" }}>.</div>
                    <h4 style={{ fontWeight: "bolder" }}>Organisations</h4>
                </div>

                <div className="orgss" style={{ display: "flex", overflowX: "auto" }}>

                    <div className="org-details" data-bs-toggle="modal" data-bs-target="#Create-Board" style={{ fontSize: "150%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f1f1f1" }}>
                        <IoIosAddCircleOutline /> <p>Add Organisation</p>
                    </div>

                    <div class="modal fade" id="Create-Board" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Add New Organisation</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="modal-body">
                                        <div class="mb-3 row">
                                            <label for="inputName" class="col-sm-12 col-form-label">Name of Organisation:</label>
                                            <div class="col">
                                                <input type="text" readonly class="form-control-plaintext" id="inputName" onChange={e => setNewOrgName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="mb-3 row">
                                            <label for="inputDescription" class="col-sm-12 col-form-label">Image of Organization:</label>
                                            <div class="col">
                                                <input type="text" class="form-control" id="inputdescription" onChange={e => setNewOrgImage(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={addOrg}>Add Organisation</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {orgs && orgs.map((organisation) => (
                        <div className="org-details"   >
                            <Link to={`/home`} style={{ fontStyle: "none", marginLeft: "3%",textDecoration:"none" }} onClick={updateuser.bind(this, organisation)} >
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                                    <img src={organisation.image} style={{ height: "7vh", width: "5vh" }} alt="" />
                                    <h4>{organisation.name}</h4>
                                </div>
                                <p><strong>Creator: </strong>{organisation.createdByName}</p>
                                {/* <p>{formatDistanceToNow(new Date(organisation.createdAt), { addSuffix: true })}</p> */}
                            </Link>
                                <span className="material-symbols-outlined" onClick={() => { }}>
                                    <div class="dropdown">
                                        <button class="dropbtn" onClick={()=>{console.log(organisation.createdByName)}}  onMouseEnter={()=>{setId(organisation._id)}} onMouseLeave={()=>{setId(null)}} ><FiMoreVertical /></button>
                                        <div class="dropdown-content">
                                            <button class="btn btn-dark" onClick={handleEdit}>Edit</button>
                                            <button class="btn btn-dark" onClick={handleDelete}>Delete</button>
                                        </div>
                                    </div>
                                </span>
                        </div>
                    ))}

                </div>

            </div >
        </>
    )


}
export default Organisation;