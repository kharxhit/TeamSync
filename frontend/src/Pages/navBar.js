import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import useLogout from '../hooks/useLogout'
import './navbar.css'
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
const NavBar = () => {
    const [orgOpen, setOrgOpen] = useState(null)
    const { logout } = useLogout()
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        const getOrg = async () => {
            const orgg = JSON.parse(localStorage.getItem('user')).openOrg;
            setOrgOpen(orgg);
        }
        getOrg();
    }, [])
    const clickHandler = async () => {
        logout()
        window.location.reload()
    }


    const orgout = async () => {

        const a = JSON.parse(localStorage.user)
        a.openOrg = {
            "openOrgId": null,
            "openOrgName": null
        }
        a.openProject = {
            "openProjectId": null,
            "openProjectName": null
        }
        localStorage.user = JSON.stringify(a);
        console.log(a)

        document.location.reload()

        await fetch(`/user/${user._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "openOrg": {
                    "openOrgId": null,
                    "openOrgName": null
                },
                "openProject":{
                    "openProjectId": null,
                    "openProjectName": null
                }
            })
        })


    }
    console.log("ajajaajajaj")
    // console.log(orgOpen.openOrgId)
    console.log(user)
    if (user!=null) {
        if(orgOpen  && orgOpen.openOrgId === null){
            return (
            <>
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <img src="https://www.clipartmax.com/png/small/413-4139811_transparent-background-cool-logo.png" alt="Transparent Background Cool Logo @clipartmax.com" style={{ height: "5vh", marginLeft: "0", paddingLeft: '0', }} />
                        <Link to="/" className="Pname nav-link active" style={{ textDecoration: "none", color: "black", fontSize: "150%", fontWeight: "bold", marginRight: "2%", marginLeft: "1%" }} onClick={orgout}>TeamSync</Link>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        
                        <div style={{ display: "flex", alignItems: "center", marginRight: "2%" }}>
                            <CgProfile style={{ fontSize: "150%", margin: "4px" }} />
                            <Link to='/profile' style={{ fontSize: "80%", marginBottom: "0", textDecoration: "none" }}>{user.name}</Link>
                        </div>
                        <button class="btn btn-secondary btn-sm" onClick={clickHandler} style={{ marginRight: "2%" }}>Log out</button>
                    </div>
                </nav>
            </>
            )
        }
        else{
            return (
                <>
                    <nav class="navbar navbar-expand-lg bg-body-tertiary">
                        <div class="container-fluid">
                            <img src="https://www.clipartmax.com/png/small/413-4139811_transparent-background-cool-logo.png" alt="Transparent Background Cool Logo @clipartmax.com" style={{ height: "5vh", marginLeft: "0", paddingLeft: '0', }} />
                            <Link to="/" className="Pname nav-link active" style={{ textDecoration: "none", color: "black", fontSize: "150%", fontWeight: "bold", marginRight: "2%", marginLeft: "1%" }} onClick={orgout}>TeamSync</Link>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <ul class="navbar-nav me-auto mb-0 mb-lg-0">
                            <li class="nav-item" style={{ display: "flex", alignItems: "center" }}>
                                <Link to='/home' className='nav-link' style={{ textDecoration: "none" }}>Home</Link>
                            </li>
                            <li class="nav-item" style={{ display: "flex", alignItems: "center" }}>
                                <Link to='/mytask' className='nav-link' style={{ textDecoration: "none" }}>My tasks</Link>
                            </li>
                            <li class="nav-item" style={{ display: "flex", alignItems: "center" }}>
                                <Link to='/projects' className='nav-link' style={{ textDecoration: "none" }}>Projects</Link>
                            </li>
                            <li class="nav-item" style={{ display: "flex", alignItems: "center" }}>
                                <Link to='/orgdetails' className='nav-link' style={{ textDecoration: "none" }}>org details</Link>
                            </li>
                        </ul>
                            <div style={{ display: "flex", alignItems: "center", marginRight: "2%" }}>
                                <p style={{ marginBottom: "0" }}>org : </p><p style={{ fontSize: "120%", marginBottom: "0" }}>{orgOpen.openOrgName}</p>
                            </div>
                        
                        <div style={{ display: "flex", alignItems: "center", marginRight: "2%" }}>
                            {/* <CgProfile style={{ fontSize: "150%", margin: "4px" }} /> */}
                                {user.image && <img className="navDp" src={user.image} alt="User Avatar" style={{height:"35px",width:"35px",objectFit:"scale-down"}}/>}
                                {!user.image &&<Avatar name={user.name} size="35" round={true} textSizeRatio={1.7} style={{marginRight:"3px"}}></Avatar>}
                            <Link to='/profile' style={{ fontSize: "80%", marginBottom: "0", textDecoration: "none" }}>{user.name}</Link>
                        </div>
                        <button class="btn btn-secondary btn-sm" onClick={clickHandler} style={{ marginRight: "2%" }}>Log out</button>
                    </div>
                </nav>
            </>
        )
    }
}
}

export default NavBar