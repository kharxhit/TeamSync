import React, { useEffect, useState } from "react";
import './board.css'
import NavBar from "../navBar";
import TaskCard from './TaskCard';
// import { useGlobalTaskContext } from '../../context/taskContext';
import './board.css'
import { RiMessage3Line, RiAttachment2 } from 'react-icons/ri';
import { Link } from "react-router-dom";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { intervalToDuration } from "date-fns";
import Avatar from 'react-avatar';
import Select from 'react-select';
import { IoIosAddCircleOutline } from 'react-icons/io'




const Task = () => {
    //all the employees in the project list
    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
        { value: 'option4', label: 'Option 4' }
    ];
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSelectChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
    };

    const [tassk, uptassk] = useState(new Map());

    const [tasks, collecttasks] = useState([]);
    const [taskname,tname]=useState("");
    const [taskdes,tdes]=useState("");
    const [taskprio,tprio]=useState("");
    const [taskcat,tcat]=useState("");

    var taskk;
    useEffect(() => {

        const total = async () => {
            taskk = await fetch("/tasks/");
            taskk = await taskk.json();
            collecttasks(taskk);
        }
        total();

    }, []);

    useEffect(() => {
        console.log("cheeku")
        console.log(tasks);
        console.log("aditya")
        tasks.map((steptask) => {
            if (!tassk.has(steptask.category)) {
                tassk.set(steptask.category);
                tassk[steptask.category] = []
                console.log("aditya")
                tassk[steptask.category].push(steptask);
            }
            else {
                tassk[steptask.category].push(steptask)
            }
        })
        uptassk(tassk);
        console.log(Object.keys(tassk));
    }, [tasks])
    
    const addTask=async ()=>{
        console.log(taskcat);
        const task=await fetch('/tasks/',{
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "title":taskname,
                "description":taskdes,
                // "priority":taskprio,
                "category":taskcat
            })
            
        })
        // const taskkk=await task.json();
        // console.log();
       
    }

    if (tassk.size) {
        return (

            <>
                {/* <NavBar /> */}

                <div className="cards">

                    {Object.keys(tassk).map((key) => (
                        <div className="card">
                            <div style={{ justifyContent: "space-between", display: "flex", marginBottom: "5%" }}>
                                <div style={{ display: "flex" }}>
                                    <div style={{ width: "6%", backgroundColor: "blue", marginRight: "8px", borderRadius: "20%" }}>.</div>
                                    <h4 className="label">{key}</h4>
                                </div>
                                <button data-bs-toggle="modal" data-bs-target="#Task-add" onClick={()=>{}} style={{ fontSize: "150%" }}><IoIosAddCircleOutline /></button>
                            </div>
                            <div className="modal fade" id="Task-add" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{}}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Add task to {key}</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body" style={{ fontSize: "16px" }}>
                                            <div class="mb-3 row">
                                                <label for="inputName" class="col-sm-12 col-form-label">Task:</label>
                                                <div class="col">
                                                    <input type="text" readonly class="form-control-plaintext" id="inputName" onChange={(e) => {tname(e.target.value) }} />
                                                </div>
                                            </div>
                                            <div class="mb-3 row">
                                                <label for="inputDescription" class="col-sm-12 col-form-label">Description of Task</label>
                                                <div class="col">
                                                    <input type="text" class="form-control" id="inputdescription" onChange={(e) => {tdes(e.target.value); }} />
                                                </div>
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <p class="label">Priority:</p>
                                                <div class="priority">
                                                    <select>
                                                        <option onClick={()=>tprio("High")}>High</option>
                                                        <option onClick={()=>tprio("Medium")} >Medium</option>
                                                        <option onClick={()=>tprio("Low")}>Low</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <p class="label">assignees:</p>
                                                <div class="priority" style={{ maxWidth: "60%" }}>
                                                    <Select
                                                        isMulti
                                                        options={options}
                                                        value={selectedOptions}
                                                        onChange={handleSelectChange}
                                                    />
                                                </div>
                                            </div>
                                            <div style={{ alignItems: "center" }}>
                                                <label for="category">Select or Enter a Category:</label>
                                                <select id="category" name="category" onChange={(e)=>tcat(e.target.value)}>
                                                    <option value="" selected disabled hidden>Choose an option</option>
                                                    <option value="brainStorm" >brainStorm</option>
                                                    <option value="done" >done</option>
                                                    <option value="toDo">toDo</option>
                                                    <option value="deployed">deployed</option>
                                                    <option value="inprogress" >inProgress</option>
                                                    <option value="backLog">toDo</option>
                                                    <option value="onHold">deployed</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={addTask}>Add Task</button>


                                        </div>
                                    </div>
                                </div>
                            </div>


                            {tassk[key].map(value1 => (
                                <div>

                                    <div className="taskcard" data-bs-toggle="modal" data-bs-target="#Task-modal" onClick={() => { }}>

                                        <div style={{ textDecoration: "none" }}><h5 className="label">{value1.title}</h5></div>
                                        <p style={{ wordBreak: "break-all", whiteSpace: "normal" }}>{value1.description}</p>
                                        <div style={{ justifyContent: "space-between", display: "flex", fontSize: "120%" }}>
                                            <div style={{ display: "flex", fontSize: "120%" }}>
                                                <div style={{ margin: "1%" }}><RiMessage3Line /></div>
                                                <div style={{ margin: "1%" }}><RiAttachment2 /></div>
                                            </div>
                                            <div className="assignee-section">
                                                {/* {assignees.slice(0, maxAssigneesToShow).map((assignee) => ( */}
                                                <img
                                                    // key={assignee.id}
                                                    className="profile-pic profile-pic-1"
                                                    src="https://media.licdn.com/dms/image/C4D03AQF4YzkOLDiQ_Q/profile-displayphoto-shrink_800_800/0/1659527720326?e=2147483647&v=beta&t=HRCFpCvvIxCWMW-EcNHYLOMCl2Jc8f8T16W0PRLmO6o"
                                                    alt="pratham"
                                                    title="pratham"
                                                />
                                                <img
                                                    // key={assignee.id}
                                                    className="profile-pic profile-pic-2"
                                                    src="https://media.licdn.com/dms/image/C4D03AQF4YzkOLDiQ_Q/profile-displayphoto-shrink_800_800/0/1659527720326?e=2147483647&v=beta&t=HRCFpCvvIxCWMW-EcNHYLOMCl2Jc8f8T16W0PRLmO6o"
                                                    alt="pratham"
                                                    title="pratham"
                                                />
                                                <img
                                                    // key={assignee.id}
                                                    className="profile-pic profile-pic-3"
                                                    src="https://media.licdn.com/dms/image/C4D03AQF4YzkOLDiQ_Q/profile-displayphoto-shrink_800_800/0/1659527720326?e=2147483647&v=beta&t=HRCFpCvvIxCWMW-EcNHYLOMCl2Jc8f8T16W0PRLmO6o"
                                                    alt="pratham"
                                                    title="pratham"
                                                />
                                                {/* ))} */}
                                                {/* {assignees.length > maxAssigneesToShow && ( */}
                                                <div className="more-assignees">
                                                    <Avatar
                                                        name={`+ 5`}
                                                        size="32"
                                                        round={true}
                                                        color="blue"
                                                        textSizeRatio={2.3}
                                                    />
                                                </div>
                                                {/* )} */}
                                            </div>
                                        </div>


                                    </div>
                                    <div className="modal fade" id="Task-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{}}>
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">{value1.title}</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body" style={{ fontSize: "14px" }}>
                                                    <div className="TaskHead" style={{ display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
                                                        <div style={{ display: "flex" }}>
                                                            <p class="label">Created By:</p>
                                                            <p>Pratham</p>
                                                        </div>

                                                        <div style={{ display: "flex" }}>
                                                            <p class="label">Last updated:</p>
                                                            <p>{formatDistanceToNow(new Date(value1.updatedAt), { addSuffix: true })}</p>
                                                        </div>

                                                        <div style={{ display: "flex", onClick: () => { }, cursor: "pointer" }}>
                                                            <p class="label" style={{ color: "red", fontSize: "14px" }}>Delete task</p>
                                                        </div>

                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "space-between" ,marginBottom:'5px'}}>
                                                        <p class="label">Assigned To:</p>
                                                        <div className="assignee-section">
                                                            {/* {assignees.slice(0, maxAssigneesToShow).map((assignee) => ( */}
                                                            <img
                                                                // key={assignee.id}
                                                                className="profile-pic profile-pic-1"
                                                                src="https://media.licdn.com/dms/image/C4D03AQF4YzkOLDiQ_Q/profile-displayphoto-shrink_800_800/0/1659527720326?e=2147483647&v=beta&t=HRCFpCvvIxCWMW-EcNHYLOMCl2Jc8f8T16W0PRLmO6o"
                                                                alt="pratham"
                                                                title="pratham"
                                                            />
                                                            <img
                                                                // key={assignee.id}
                                                                className="profile-pic profile-pic-2"
                                                                src="https://media.licdn.com/dms/image/C4D03AQF4YzkOLDiQ_Q/profile-displayphoto-shrink_800_800/0/1659527720326?e=2147483647&v=beta&t=HRCFpCvvIxCWMW-EcNHYLOMCl2Jc8f8T16W0PRLmO6o"
                                                                alt="pratham"
                                                                title="pratham"
                                                            />
                                                            <img
                                                                // key={assignee.id}
                                                                className="profile-pic profile-pic-3"
                                                                src="https://media.licdn.com/dms/image/C4D03AQF4YzkOLDiQ_Q/profile-displayphoto-shrink_800_800/0/1659527720326?e=2147483647&v=beta&t=HRCFpCvvIxCWMW-EcNHYLOMCl2Jc8f8T16W0PRLmO6o"
                                                                alt="pratham"
                                                                title="pratham"
                                                            />
                                                            {/* ))} */}
                                                            {/* {assignees.length > maxAssigneesToShow && ( */}
                                                            <div className="more-assignees">
                                                                <Avatar
                                                                    name={`+ 5`}
                                                                    size="32"
                                                                    round={true}
                                                                    color="grey"
                                                                    textSizeRatio={2}
                                                                />
                                                            </div>
                                                            {/* )} */}
                                                        </div>
                                                    </div>
                                                    { /*iske liye naye options bna lena*/ }
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>  
                                                        <p class="label">Add assignees:</p>
                                                        <div class="priority" style={{ maxWidth: "60%" }}>
                                                            <Select
                                                                isMulti
                                                                options={options}
                                                                value={selectedOptions}
                                                                onChange={handleSelectChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <p class="label">Priority:</p>
                                                        <div class="priority">
                                                            <select>
                                                                <option>High</option>
                                                                <option>Medium</option>
                                                                <option>Low</option>
                                                            </select>
                                                        </div>
                                                    </div>


                                                    <div class="description" >
                                                        <p class="label">Description:</p>
                                                        <p>{value1.description}</p>
                                                    </div>

                                                    <div class="attachments" >
                                                        <p class="label">Attachments:</p>
                                                        <ul>
                                                            <li><a href="#">attachment1.docx</a></li>
                                                            <li><a href="#">attachment2.jpg</a></li>
                                                            <li><a href="#">attachment3.pdf</a></li>
                                                        </ul>
                                                    </div>

                                                    <div class="comments" >
                                                        <p class="label">Comments:</p>
                                                        <ul>
                                                            <li><p className="label">raghav:</p>Comment 1</li>
                                                            <li><p className="label">Muhawara:</p>Comments "let me sleep"</li>
                                                            <li ><p className="label">piyush:</p>Comment 2</li>
                                                            <li ><p className="label">agrawal:</p>Comment 3</li>
                                                        </ul>
                                                    </div>

                                                    <div class="add-comment"  >
                                                        <p class="label">Add Comment:</p>
                                                        <textarea style={{ resize: "verticle", }}></textarea>
                                                        {/* button for adding comments */}
                                                        <button>Add</button>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </div>
                    ))}
                </div>

            </>
        )
    }


}

export default Task