import React  from "react";
import "../css/SignIn.css";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



class SignIn extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            name : "",
            email : "",
            password : "",
            mobileNo : "",
            company : ""
        }
    }

    registerUser = async() =>{
        try{
           
            let {data} = await axios.post("http://localhost:3001/users/register",{
                name : this.state.name,
                email : this.state.email,
                password : this.state.password,
                mobileNo : this.state.mobileNo,
                company : this.state.company
            });
            console.log(data);
            this.setState({name : "", email : "", password : "", mobileNo : "", company : ""});
            alert(data);
           
           
            
        }catch(error){
            console.log("Error while registering user : ", error);
        }
       
    }

    handlechange = ({target :{name, value}}) =>{
        this.setState({[name] : value})
       
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        this.registerUser();
        console.log(this.state);
   
    }

    render(){

       
        return(
            <div className = "container-fluid ">
                <div className = "SignInPage d-flex">
                    <div>
                        <h3>Registration Page</h3>
                        <form onSubmit = {this.handleSubmit}>
                            <div className = "p-1">
                                <TextField
                                variant = "outlined"
                                label = "Name"
                                type = "text" 
                                name = "name"
                                required
                                value = {this.state.name}
                                onChange = {this.handlechange}/>
                            </div>
                            <div className = "p-1">
                            <TextField
                                variant = "outlined"
                                label = "Email"
                                type = "email"
                                name = "email"
                                required
                                value = {this.state.email}
                                onChange = {this.handlechange}/>
                            </div>
                            <div className = "p-1">
                                <TextField
                                variant = "outlined"
                                label = "Password" type = "password" 
                                name = "password"
                                required
                                value = {this.state.password}
                                onChange = {this.handlechange}/>
                            </div>
                            <div className = "p-1">
                                <TextField
                                variant = "outlined"
                                label = "Mobile Number" type = "tel" 
                                name = "mobileNo"
                                required
                                values = {this.state.mobileno}
                                onChange = {this.handlechange}/>
                            </div>
                            <div className = "p-1">
                                <TextField
                                variant = "outlined"
                                label = "Company" type = "text" 
                                name = "company"
                                required
                                value = {this.state.company}
                                onChange = {this.handlechange}/>
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
}

export default SignIn;