import React from "react";
import axios from "axios";
import "../css/AddPost.css";
import { Redirect } from "react-router";

class AddPost extends React.Component{
    constructor(props){
        super(props);
        this.state={
            posts : [],
            id : this.props.id,
            title : this.props.title,
            body : this.props.body,
            action : this.props.action,
            show : false
        }
    }


    updatePost = async() =>{
        try{
            const {data} = await axios.put(
                `http://localhost:3001/posts/${this.state.id}`,{
                 userId : localStorage.getItem("userId"),
                 title : this.state.title,
                 body : this.state.body
             });
             console.log(data);
             this.setState({posts : [], userId : "", title : "", body : ""});
             alert(data);
             
         }catch(err){
             console.log("Error while updating post", err);
         }
         
    }

    createPost = async()=>{
        
        try{
            let data = await axios.post(
            "http://localhost:3001/posts",{
            userId : localStorage.getItem("userId"),
            title : this.state.title,
            body : this.state.body
        });
        console.log(data);
        
        this.setState({posts : [], userId : "", title : "", body : ""});
        alert("Created Post Successfully");
        
        }catch(err){
        console.log("Error while creating post",err);
    }
         
    }

    handleChange = ({target :{name, value}}) =>{
        this.setState({[name] : value})
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        if(this.state.action === "updatepost")
            this.updatePost();
        else 
            this.createPost();
    }

    render(){
    
        if(!localStorage.getItem("username")){
            this.setState({show : false});
            alert("Please login to add post");
            return <Redirect to = "/login"/>
        }
        
        return(
            <div className = "container-fluid">
                <div className = "addpost-container">
                    <form onSubmit = {this.handleSubmit}>
                            <div>
                                <label htmlFor = "title">Title</label><br/>
                                <textarea className = "inputTitle" 
                                name = "title"
                                value = {this.state.title}
                                onChange = {this.handleChange}
                                />
                            </div>
                            <div>  
                                <label htmlFor = "body">Body</label><br/>
                                <textarea className = "inputBody"
                                name = "body"
                                value = {this.state.body}
                                onChange = {this.handleChange}
                                />
                            </div>
                                <button className = "btn-success" type = "submit">Submit</button>
                            </form>
                    </div>
            </div>
        )
    }
}

export default AddPost;