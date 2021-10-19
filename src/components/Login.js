import React  from "react";
import "../css/LoginPage.css";
import LoginBackground from "../img/Login-Background.jpg";

class Login extends React.Component{
  

    render(){
        return(
            <div className = "container-fluid LoginPage">
                <div className = "LoginPage d-flex">
                    <div>                 
                        <h3>Login Page</h3>
                        <form className = "">
                            <div className = "p-1">
                                <label htmlFor = "email">Email</label><br/>
                                <input type = "text" name = "email"/>
                            </div>
                            <div className = "p-1">
                                <label htmlFor = "password">Password</label><br/>
                                <input type = "password" name = "password"/>
                            </div>
                            <div className = "p-1">
                                <button className = "btn btn-success btn-sm" type = "submit">Login</button>
                            </div>
                        </form>
                    </div>
                    <div className = "">
                        <img src = {LoginBackground} alt = "Login page Background" />
                    </div>
                    
                </div>
               
            </div>
        )
    }
}

export default Login;