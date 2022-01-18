import HomePage from "../img/HomePage.jpg"
import "../css/Home.css";
import Login from "./Login";
import { useState } from "react";
import SignIn from "./SignIn";
import Button from '@mui/material/Button';

function Home(){

    const [state, setState] = useState(false);
    
    console.log(state);

    const handleChange=()=>{
        setState(!state);
    }

    return(
        <div className = "container-fluid home">
            <div className="left-container">
                <h1 className = "text-center home-title">MAKE YOUR OWN BLOG WITH US</h1>
                <img className = "homepage" src = {HomePage} alt = "Home Page Background"/>
            </div>
            <div className = "right-container text-center">
                {state ? <SignIn/> : <Login/>} 
                <Button onClick={handleChange}>
                    {state ? "Back to Login" : "New User? Please click here to register."}
                </Button>
            </div>
        </div>
    )
}

export default Home;