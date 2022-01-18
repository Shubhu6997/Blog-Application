import React, {useState}  from "react";
import "../css/SignIn.css";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



function SignIn() {
    
        const [userDetails, setUserDetails] = useState({
            name : "",
            email : "",
            password : "",
            mobileNo : "",
            company : ""
        })

    const registerUser = async() =>{
        try{
           
            let {data} = await axios.post(`https://${process.env.REACT_APP_HOST_NAME}/users/register`,{
                name : userDetails.name,
                email : userDetails.email,
                password : userDetails.password,
                mobileNo : userDetails.mobileNo,
                company : userDetails.company
            });

            console.log(data);
            setUserDetails({name : "", email : "", password : "", mobileNo : "", company : ""});
            alert(data);
             
        }catch(error){
            console.log("Error while registering user : ", error);
        }
       
    }

    const handlechange = (event) =>{
        setUserDetails({
            ...userDetails,
            [event.target.name] : event.target.value
        })
       
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        registerUser();
        console.log(userDetails);
   
    }

   
       
        return(
            <div className = "container-fluid ">
                <div className = "SignInPage d-flex">
                    <div>
                        <h3>Sign In</h3>
                        <form onSubmit = {handleSubmit}>
                            <div className = "p-1">
                                <TextField
                                variant = "outlined"
                                label = "Name"
                                type = "text" 
                                name = "name"
                                required
                                value = {userDetails.name}
                                onChange = {handlechange}/>
                            </div>
                            <div className = "p-1">
                            <TextField
                                variant = "outlined"
                                label = "Email"
                                type = "email"
                                name = "email"
                                required
                                value = {userDetails.email}
                                onChange = {handlechange}/>
                            </div>
                            <div className = "p-1">
                                <TextField
                                variant = "outlined"
                                label = "Password" type = "password" 
                                name = "password"
                                required
                                value = {userDetails.password}
                                onChange = {handlechange}/>
                            </div>
                            <div className = "p-1">
                                <TextField
                                variant = "outlined"
                                label = "Mobile Number" type = "tel" 
                                name = "mobileNo"
                                required
                                values = {userDetails.mobileno}
                                onChange = {handlechange}/>
                            </div>
                            <div className = "p-1">
                                <TextField
                                variant = "outlined"
                                label = "Company" type = "text" 
                                name = "company"
                                required
                                value = {userDetails.company}
                                onChange = {handlechange}/>
                            </div>
                            <div className = "p-1">
                                <Button
                                variant="contained"
                                size="small"
                                type = "submit"
                                style={{
                                    width : 225
                                }}
                                >Sign up</Button>
                            </div>      
                              
                        </form>
                    </div>
                </div>
            </div>
        )

}

export default SignIn;