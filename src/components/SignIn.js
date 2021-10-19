import React  from "react";
import SignInBackground from "../img/SignIn-Background.jpg";
import "../css/SignIn.css";
class SignIn extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className = "container-fluid d-flex SignInPage">
                <div>
                    <form>
                        <div className = "p-1">
                            <label htmlFor = "name">Name</label><br/>
                            <input type = "text" name = "name"/>
                        </div>
                        <div className = "p-1">
                            <label htmlFor = "email">Email</label><br/>
                            <input type = "email" name = "email"/>
                        </div>
                        <div className = "p-1">
                            <label htmlFor = "password">password</label><br/>
                            <input type = "password" name = "password"/>
                        </div>
                        <div className = "p-1">
                            <label htmlFor = "mobileNo">Mobile Number</label><br/>
                            <input type = "tel" name = "mobileNo"/>
                        </div>
                        <div className = "p-1">
                            <label htmlFor = "company">Company</label><br/>
                            <input type = "text" name = "company"/>
                        </div>
                        <div className = "p-1">
                            <button className = "btn btn-success" type = "submit">Sign up</button>
                        </div>
                        
                    </form>
                </div>
                <div className = "ImageContainer">
                    <img src = {SignInBackground} alt = "Register page background"/>
                </div>
            
            </div>
        )
    }
}

export default SignIn;