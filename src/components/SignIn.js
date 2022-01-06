import React  from "react";
import "../css/SignIn.css";
import axios from "axios";
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
                        <form onSubmit = {this.handleSubmit}>
                            <div className = "p-1">
                                <label htmlFor = "name">Name</label><br/>
                                <input type = "text" 
                                name = "name"
                                value = {this.state.name}
                                onChange = {this.handlechange}/>
                            </div>
                            <div className = "p-1">
                                <label htmlFor = "email">Email</label><br/>
                                <input type = "email"
                                name = "email"
                                value = {this.state.email}
                                onChange = {this.handlechange}/>
                            </div>
                            <div className = "p-1">
                                <label htmlFor = "password">password</label><br/>
                                <input type = "password" 
                                name = "password"
                                value = {this.state.password}
                                onChange = {this.handlechange}/>
                            </div>
                            <div className = "p-1">
                                <label htmlFor = "mobileNo">Mobile Number</label><br/>
                                <input type = "tel" 
                                name = "mobileNo"
                                values = {this.state.mobileno}
                                onChange = {this.handlechange}/>
                            </div>
                            <div className = "p-1">
                                <label htmlFor = "company">Company</label><br/>
                                <input type = "text" 
                                name = "company"
                                value = {this.state.company}
                                onChange = {this.handlechange}/>
                            </div>
                            <div className = "p-1">
                                <button className = "btn btn-success" type = "submit">Sign up</button>
                            </div>        
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignIn;