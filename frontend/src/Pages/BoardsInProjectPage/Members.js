import React, { useEffect, useState } from "react";
// import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { IoIosAddCircleOutline } from 'react-icons/io'

const Members = () => {
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [members, setMembers] = useState([]);
    useEffect(()=> {
        const fetchdata = async () => {
            let openOrg = JSON.parse(localStorage.getItem('user')).openOrg;
            let org = await fetch(`organisation/${openOrg.openOrgId}`);
            let orgss = await org.json();
            let memberss = orgss.members;
            setMembers(memberss);
            console.log(members);

        }
        fetchdata();
    },[]);

    useEffect(() => {
        const fetchdata = async () => {
            let project = await fetch(`/projects/${JSON.parse(localStorage.getItem('user')).openProject.openProjectId}`);
            let projectss = await project.json();
            let memberss = projectss.members;
            setSelectedMembers(memberss);
            console.log(selectedMembers);

        }
        fetchdata();
    }, []);
    const handleUserClick = async(user) => {
        const isSelected = selectedMembers.some((selectedUser) => selectedUser._id === user._id);

        // Show confirmation alert before updating selection
        if (isSelected) {
            if (window.confirm('Are you sure you want to deselect this user?')) {
                setSelectedMembers((prevMembers) => prevMembers.filter((selectedUser) => selectedUser._id !== user._id));
                await fetch(`/projects/${JSON.parse(localStorage.getItem('user')).openProject.openProjectId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "members":  selectedMembers })
                })
            }
        } else {
            setSelectedMembers([...selectedMembers, user]);
            console.log(selectedMembers);
            await fetch(`/projects/${JSON.parse(localStorage.getItem('user')).openProject.openProjectId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "members":  selectedMembers })
            })
        }
    };
    return (
        <>
            <div >
                <div style={{ display: "flex", height: "10vh", alignItems: "center", backgroundColor: "#f1f1f1", boxShadow: "2px 2px 5px rgba(0,0,0,0.10)", fontFamily: "Verdana" }}>
                    <div style={{ width: "0.7%", backgroundColor: "blue", marginRight: "8px", borderRadius: "20%" }}>.</div>
                    <h3>Members</h3>
                </div>
                <div style={{ display: "flex", overflowX: "auto" }}>
                    <div className="board-details" data-bs-toggle="modal" data-bs-target="#add-member-Board" onClick={() => { }} style={{ width: "28%", fontSize: "150%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f1f1f1" }}>
                        <IoIosAddCircleOutline /> <p>New Member</p>
                    </div>
                    <div class="modal fade" id="add-member-Board" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Add members To the project</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-content">
                                    <ul className="user-list">
                                        {members.map((user) => (
                                            <li
                                                key={user.id}
                                                className={`user-item ${selectedMembers.some((selectedUser) => selectedUser._id === user._id) ? 'selected' : ''}`}
                                                onClick={() => handleUserClick(user)}

                                            >
                                                <div className="user-avatar">
                                                <img src={user.image} alt={user.name} />
                                                </div>
                                                <div style={{display:"flex",flexDirection:"column"}}>
                                                {user.name}
                                                <div style={{ fontSize: "12px" }}>{user.email}</div>
                                                </div>

                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {selectedMembers && selectedMembers.map((selectedMemberss) => (
                        <div className="members-details" style={{ width: "25%", fontFamily: "Verdana" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                                <h4>{selectedMemberss.name}</h4>
                            </div>
                            <p><strong>email: </strong>{selectedMemberss.email}</p>
                        </div>
                    )
                    )}
                </div>
            </div>
        </>
    )


}
export default Members;