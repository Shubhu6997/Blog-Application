import React  from "react";
import "../css/LoginPage.css";
import axios from "axios";
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';



class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email : "",
            password : ""
        }
    }

    loginUser = async() =>{
        try{
            console.log("login method called")
            let {data} = await axios.post(`https://${process.env.REACT_APP_HOST_NAME}/users/login`,{
                email : this.state.email,
                password : this.state.password,
            });
            console.log(data);

            if(data.message === "Logged in Successfully"){
                localStorage.setItem("username", this.state.email);
                localStorage.setItem("userId", data.userId);
                localStorage.setItem("name", data.name);
            }
               
            else{
                localStorage.removeItem("username");
                localStorage.removeItem("userId");
                localStorage.removeItem("name");
            }    

            this.setState({email : "", password : ""});
            alert(data.message);

        }catch(error){
            console.log("Error while logging user : ", error);
        }
       
    }

    handleChange = ({target : {name, value}}) =>{
        this.setState({[name] : value});
    }

    hanldeSubmit = (event) =>{
        event.preventDefault();
        this.loginUser();
        console.log(this.state);

    }
    render(){
        return(
            <div className = "container-fluid">
                <div className = "LoginPage d-flex">
                    <div>                 
                        <h3>Login Page</h3>
                        <form className = "" onSubmit = {this.hanldeSubmit}>
                            <div className = "p-1">
                                <TextField 
                                variant = "outlined"
                                label="Email"
                                name = "email"
                                required
                                value = {this.state.email}
                                onChange = {this.handleChange}/>
                            </div>
                            <div className = "p-1">
                                <TextField 
                                variant = "outlined"
                                label = "Password"
                                type = "password" 
                                name = "password"
                                required
                                value = {this.state.password}
                                onChange = {this.handleChange} />
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
                            <div>
                                <Link to="/sign-in">New User? Please click here to register.</Link>
                            </div>
                        </form>
                    </div>  
                </div>
               
            </div>
        )
    }
}

export default Login;