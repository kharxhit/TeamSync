import React from 'react';
import {BrowserRouter , Routes , Route ,Navigate } from 'react-router-dom';

// pages
import Home from './Pages/HomePage/Home'
import Landing from './Pages/LandingPage/Landing'
import SignUp from './Pages/Signup/Signup';
import Login from "./Pages/Login/Login"

const App= ()=> {
    return (
    <>
        { 
            <BrowserRouter>
                <Routes>
                    <Route
                        exact path="/"
                        element={<Landing/>}
                    />
                    <Route exact path="/signup" element={<SignUp/>}/>
                    <Route exact path="/login" element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        }
    </>
  );
}
export default App;
