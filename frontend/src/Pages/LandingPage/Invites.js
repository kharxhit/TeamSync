import React, { useEffect, useState } from "react";
// import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Invites = () => {
    const [invite, setInvite] = useState([]);

    useEffect(() => {

        const fetchdata = async () => {
            let id = JSON.parse(localStorage.getItem('user'))._id;
            const user = await fetch(`user/${id}`);
            // console.log("ethe")
            const users = await user.json();
            const allInvites = users.invites;
            setInvite(allInvites);
        }

        fetchdata();


    }, [invite])

    const handleDelete = async (Orgid, Inviteid, userInviteId) => {
        const index = invite.findIndex(obj => obj._id === Inviteid);
        let tempinvites = invite;
        if (index !== -1) {
            tempinvites = invite.splice(index, 1);
        }

        setInvite(tempinvites);

        let temp = await fetch(`organisation/${Orgid}`);
        let tempOrg = await temp.json();
        let membersInvited = tempOrg.membersInvited;

        const userInviteIndex = membersInvited.indexOf(userInviteId);
        
        if (userInviteIndex > -1) {
            membersInvited.splice(userInviteIndex, 1);
        }
        

        fetch(`organisation/${Orgid}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "membersInvited": membersInvited })
        })

        fetch(`user/${JSON.parse(localStorage.getItem('user'))._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "invites": invite })
        })

    }

    const handleAccept = async (Orgid, Inviteid, userInviteId) => {

        const index = invite.findIndex(obj => obj._id === Inviteid);
        let tempinvites = invite;
        if (index !== -1) {
            tempinvites = invite.splice(index, 1);
        }
        setInvite(tempinvites);


        let temp = await fetch(`organisation/${Orgid}`);
        let tempOrg = await temp.json();
        let members = tempOrg.members;
        let membersInvited = tempOrg.membersInvited;
        const userInviteIndex = membersInvited.indexOf(userInviteId);
        if (userInviteIndex > -1) {
            membersInvited.splice(userInviteIndex, 1); 
        }

        fetch(`organisation/${Orgid}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "membersInvited": membersInvited })
        })

        let newMemberAcceptObj = {
            name: JSON.parse(localStorage.getItem('user')).name,
            email: JSON.parse(localStorage.getItem('user')).email,
            image: JSON.parse(localStorage.getItem('user')).image,
            _id: JSON.parse(localStorage.getItem('user'))._id
        }

        fetch(`organisation/${Orgid}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "members": [...members, newMemberAcceptObj] })
        })

        let orgs = JSON.parse(localStorage.getItem('user')).orgs;

        let newOrgtoPush = {
            name: tempOrg.name,
            createdBy: tempOrg.createdBy,
            image: tempOrg.image,
            createdAt: tempOrg.createdAt,
            _id: Orgid
        }

        fetch(`user/${JSON.parse(localStorage.getItem('user'))._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "orgs": [...orgs, newOrgtoPush], "invites": invite })
        })

        const a = JSON.parse(localStorage.user)
        a.orgs = [...orgs, newOrgtoPush];
        localStorage.user = JSON.stringify(a);

    }

    // if (invite) {
    return (
        <>
            <div>
                <div style={{ display: "flex", height: "10vh", alignItems: "center", backgroundColor: "#f1f1f1", boxShadow: "2px 2px 5px rgba(0,0,0,0.10)", fontFamily: "Verdana" }}>
                    <div style={{ width: "0.7%", backgroundColor: "blue", marginRight: "8px", borderRadius: "20%" }}>.</div>
                    <h4 style={{ fontWeight: "bolder" }}>Pending Invites</h4>
                </div>
                <div className="orgss" style={{ display: "flex", overflowX: "auto" }}>
                    {invite && invite.map((invites) => (
                        <div className="invite-details" style={{ fontFamily: "Verdana" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                                <h4>{invites.OrgName}</h4>
                            </div>
                            <p><strong>Invited by: </strong>{invites.InvitedByName}</p>
                            {/* <p>{formatDistanceToNow(new Date(invites.createdAt), { addSuffix: true })}</p> */}
                            <div style={{ display: "flex", alignItems: "space-between", minWidth: "300px", justifyContent: "center", marginTop: "3%" }}>

                                <button type="submit" value="Submit" style={{ marginRight: "5%", backgroundColor: "blue", color: "white" }} onClick={() => handleAccept(invites.OrgId, invites._id, invites.InviteId)}>Accept</button>
                                <button type="reset" value="Reset" style={{ marginLeft: "5%" }} onClick={() => handleDelete(invites.OrgId, invites._id, invites.InviteId)} >Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )

    // }
    // else {
    //     return (
    //         <>
    //             <div>
    //                 <div style={{ display: "flex", height: "10vh", alignItems: "center", backgroundColor: "#f1f1f1", boxShadow: "2px 2px 5px rgba(0,0,0,0.10)", fontFamily: "Verdana" }}>
    //                     <div style={{ width: "0.7%", backgroundColor: "blue", marginRight: "8px", borderRadius: "20%" }}>.</div>
    //                     <h3>Pending Invites</h3>
    //                 </div>
    //                 <div className="orgss" style={{ display: "flex", overflowX: "auto" }}>
    //                     {console.log(invite.length)}
    //                     <h1 >Hello</h1>
    //                 </div>
    //             </div>
    //         </>
    //     )
    // }

}
export default Invites;