import { TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import "../css/ViewPost.css";
import { Button } from "@mui/material";
import  DeleteIcon  from "@material-ui/icons/Delete";
import { Divider } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from "@mui/material";


class ViewPost extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            title : "",
            postBody : "",
            comment : "",
            comments : []
            
        }
    }

    getComments = async()=>{
        try {
            const {data} = await axios.get(
                    `https://${process.env.REACT_APP_HOST_NAME}/comments/${this.props.id}`);
            this.setState({comments : [...data]})
            console.log(this.state.comments);
            console.log(this.props);
            
        } catch (error) {
            console.log("Error while fetching comments : ",error);
        }   
    }

    addComment = async()=>{
        try{
            const {data} = await axios.post(`https://${process.env.REACT_APP_HOST_NAME}/comments`,{
             postId : Number(localStorage.getItem("postId")),
             name : localStorage.getItem("name"),
             email : localStorage.getItem("username"),
             body : this.state.comment
            })
            console.log(data);
            alert(data);
            this.getComments();
        }catch(error){
            console.log("Error while adding comment : ",error);
        }
      
    }

    deleteComment = async(id)=>{
        try{
            console.log("delete Comments method is called", id);
            let {data} = await axios.delete(`https://${process.env.REACT_APP_HOST_NAME}/comments/${id}`,{
                data :{ username : localStorage.getItem("username")}
             });
            console.log(data);
            alert(data);
            this.getComments();
        }catch(error){
            console.log("Error while adding comment : ",error);
        }
      
    }
    componentDidMount(){
        this.getComments();
    }

    handleChange=(event)=>{
        this.setState({comment : event.target.value});
       
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        console.log("comment:",this.state.comment);   
        this.addComment();
    }

    render(){
        
        return(
            <div className = "container">
                <div>
                    <h2>{this.props.title}</h2>
                    <p>{this.props.body}</p>
                </div>
                <div className = "Comments-Section">
                
                <h4>Comments</h4>
                <form onSubmit = {this.handleSubmit}>
                <div className = "comment-box">
                    <TextField 
                    label = "Write your comment here..."
                    multiline
                    rows={4}
                    value = {this.state.comment}
                    onChange = {this.handleChange}
                    style = {{
                        width : 750
                    }}
                    />    
                </div>
                <div className="add-comment-button">
                    <Button
                     type = "submit" 
                     variant="contained"
                    >Add Comment</Button>
                </div>
                </form>
                {this.state.comments.map((comment)=>{
                    return(
                        <div key = {comment.id}>
                            <p><AccountCircleIcon/><b>{comment.name}</b>
                            <IconButton
                             onClick = {()=>{this.deleteComment(comment.id)}}>
                                 <DeleteIcon/>
                            </IconButton></p>
                            <p>{comment.body}</p>
                            <Divider/>
                        </div>
                    )
                })}
                </div>
                
            </div>
        )
    }
}

export default ViewPost;