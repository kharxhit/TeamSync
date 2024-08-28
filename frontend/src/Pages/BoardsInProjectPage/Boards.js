import React, { useEffect, useState } from "react";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { FiMoreVertical } from 'react-icons/fi';
import { IoIosAddCircleOutline } from 'react-icons/io'
import { Link } from "react-router-dom";
// import { useGlobalBoardContext } from "../../context/boardContext";
// import useOrgin from "../../hooks/useOrgin";


const Boards = () => {
    const [Boards, setBoards] = useState([]);
    // const [newboardId, setNewProjectId] = useState("");
    const [newBoardName, setNewBoardName] = useState("");
    const [newBoardDescription, setNewBoardDescription] = useState("");

    useEffect(() => {
        const fetchdata = async () => {
            let project = await fetch(`/projects/${JSON.parse(localStorage.getItem('user')).openProject.openProjectId}`);
            let projectss = await project.json();
            let boardObjs = projectss.boards;
            setBoards(boardObjs);
        }
        fetchdata();
    }, [])

    const addBoard = async () => {
        let tempBoard;
        await fetch('boards/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newBoardName,
                description: newBoardDescription,
                createdBy: JSON.parse(localStorage.getItem('user'))._id,
                projectId: JSON.parse(localStorage.getItem('user')).openProject.openProjectId,
            })
        })
            .then(response => response.json())
            .then(async (result) => {
                console.log('Success');
                tempBoard = {
                    name: result.name,
                    description: result.description,
                    createdAt: result.createdAt,
                    _id: result._id
                }
                setBoards([...Boards, tempBoard]);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        await fetch(`projects/${JSON.parse(localStorage.getItem('user')).openProject.openProjectId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "boards": [...Boards, tempBoard] })
        })
        setNewBoardName("");
        setNewBoardDescription("");

    }

    async function updateuser(board) {


        const a = JSON.parse(localStorage.user)
        // a.openOrg = organisation._id;
        a.openBoard = {
            openBoardId: board._id,
            openBoardName: board.name
        }
        localStorage.user = JSON.stringify(a);
        // console.log(a)
        window.location.reload()

        await fetch(`user/${JSON.parse(localStorage.getItem('user'))._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "openBoard": {
                    "openBoardId": board._id,
                    "openBoardName": board.name
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
                    <h3>Boards</h3>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <div className="board-details" data-bs-toggle="modal" data-bs-target="#Create-Board" onClick={() => { }} style={{ width: "28%", fontSize: "150%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f1f1f1" }}>
                        <IoIosAddCircleOutline /> <p>New Board</p>
                    </div>
                    <div class="modal fade" id="Create-Board" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">New Board</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="mb-3 row">
                                        <label for="inputName" class="col-sm-12 col-form-label">Name of Board:</label>
                                        <div class="col">
                                            <input type="text" readonly class="form-control-plaintext" id="inputName" onChange={e => setNewBoardName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="mb-3 row">
                                        <label for="inputDescription" class="col-sm-12 col-form-label">Description of Board:</label>
                                        <div class="col">
                                            <input type="text" class="form-control" id="inputdescription" onChange={e => setNewBoardDescription(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={addBoard}>Add Board</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {Boards && Boards.map((board) => (
                        <div className="board-details" style={{ width: "28%" }} onClick={updateuser.bind(this, board)}>
                            <Link style={{ textDecoration: "none" }} to="/task" >
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                                <h4>{board.name}</h4>
                            </div>
                            <p><strong>Creator: </strong>{board.description}</p>
                            <p>{formatDistanceToNow(new Date(board.createdAt), { addSuffix: true })}</p>
                            <span className="material-symbols-outlined"><FiMoreVertical /></span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )


}
export default Boards;