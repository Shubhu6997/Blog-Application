import React, {useState} from "react";
import "../css/Login.css";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {GoogleLogin} from "react-google-login";



function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const clientId = "748635581799-nqi94o0c5lmocfp50g9odfvts44hd3bh.apps.googleusercontent.com";

    const onSuccess = (res) =>{
        console.log("Login Success")
    };

    const onFailure = () =>{
            console.log("Login Failure")
    };
    
    const loginUser = async() =>{
        try{
            console.log("login method called")
            let {data} = await axios.post(`https://${process.env.REACT_APP_HOST_NAME}/users/login`,{
                email : email,
                password : password,
            });
            console.log(data);

            if(data.message === "Logged in Successfully"){
                localStorage.setItem("username", email);
                localStorage.setItem("userId", data.userId);
                localStorage.setItem("name", data.name);
            }
               
            else{
                localStorage.removeItem("username");
                localStorage.removeItem("userId");
                localStorage.removeItem("name");
            }    

            setEmail("");
            setPassword("");
            alert(data.message);

        }catch(error){
            console.log("Error while logging user : ", error);
        }
       
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        loginUser();
    }

        return(
            <div className = "container-fluid">
                <div className = "LoginPage d-flex">
                    <div>                 
                        <h3>Login</h3>
                        <form className = "" onSubmit = {handleSubmit}>
                            <div className = "p-1">
                                <TextField 
                                variant = "outlined"
                                label="Email"
                                name = "email"
                                required
                                value = {email}
                                onChange = {(event)=>setEmail(event.target.value)}/>
                            </div>
                            <div className = "p-1">
                                <TextField 
                                variant = "outlined"
                                label = "Password"
                                type = "password" 
                                name = "password"
                                required
                                value = {password}
                                onChange = {(event)=>setPassword(event.target.value)} />
                            </div>
                            <div className = "p-1">
                                <Button 
                                variant = "contained"
                                size = "small"
                                type = "submit"
                                style={{
                                    width : 225
                                }}
                                >Login</Button>
                            </div> 
                        </form>
                        <div className="google-sign-in">  
                        <GoogleLogin
                            clientId={clientId}
                            buttonText="Sign In with Google"
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                            style={{
                                width : 225
                            }}

                         />
                        </div>
                    </div>  
                </div>     
            </div>
        )
    
}

export default Login;