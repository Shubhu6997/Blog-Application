import React  from "react";
import "../css/LoginPage.css";
import axios from "axios";

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
            let {data} = await axios.post("http://localhost:3001/users/login",{
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
                                <label htmlFor = "email">Email</label><br/>
                                <input type = "text" 
                                name = "email"
                                value = {this.state.email}
                                onChange = {this.handleChange}/>
                            </div>
                            <div className = "p-1">
                                <label htmlFor = "password">Password</label><br/>
                                <input type = "password" 
                                name = "password"
                                value = {this.state.password}
                                onChange = {this.handleChange} />
                            </div>
                            <div className = "p-1">
                                <button className = "btn btn-success btn-sm" type = "submit">Login</button>
                            </div>
                        </form>
                    </div>  
                </div>
               
            </div>
        )
    }
}

export default Login;