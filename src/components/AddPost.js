import React from "react";
import axios from "axios";
import "../css/AddPost.css";
import { Redirect } from "react-router";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

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
                `http://${process.env.REACT_APP_HOST_NAME}/posts/${this.state.id}`,{
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
            `http://${process.env.REACT_APP_HOST_NAME}/posts`,{
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
            <div className = "addpost-container container">
                <form onSubmit = {this.handleSubmit}>
                    <div>
                        <TextField 
                        label = "Title"
                        multiline
                        maxRows={2}
                        name = "title"
                        value = {this.state.title}
                        onChange = {this.handleChange}
                        style = {{
                            width : 750,
                            padding : "10px"
                        }}
                        />
                    </div>
                    <div> 
                        <TextField 
                        label = "Body"
                        multiline
                        rows={8}
                        name = "body"
                        value = {this.state.body}
                        onChange = {this.handleChange}
                        style = {{
                            width : 750,
                            padding : "10px"
                        }}
                        />
                    </div>
                    <div className="add-post-button">
                        <Button
                            variant="contained"
                            endIcon = {<SendIcon/>}
                        >Add Post</Button>
                    </div>        
                </form>
            </div>
        )
    }
}

export default AddPost;