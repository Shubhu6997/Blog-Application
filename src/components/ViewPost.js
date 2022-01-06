import axios from "axios";
import React from "react";
import "../css/ViewPost.css";


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
                    `http://localhost:3001/comments/${this.props.id}`);
            this.setState({comments : [...data]})
            console.log(this.state.comments);
            console.log(this.props);
            
        } catch (error) {
            console.log("Error while fetching comments : ",error);
        }   
    }

    addComment = async()=>{
        try{
            const {data} = await axios.post(`http://localhost:3001/comments`,{
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
            console.log("deletComments method is called", id);
            let {data} = await axios.delete(`http://localhost:3001/comments/${id}`,{
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
                <h3>Comments</h3>

                <form onSubmit = {this.handleSubmit}>
                <div className = "AddComment">
                    <textarea className = "comment-textarea"
                    placeholder = "Write your comment"
                    value = {this.state.comment}
                    onChange = {this.handleChange}
                    />
                    <br/>
                    <button type = "submit" className = "btn btn-primary btn-sm">Add</button>
                </div>
                </form>
                {this.state.comments.map((comment)=>{
                    return(
                        <div key = {comment.id}>
                            <p><b>{comment.name}</b>
                            <button className = "btn btn-danger btn-sm"
                             onClick = {()=>{this.deleteComment(comment.id)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                            </button></p>
                            <p>{comment.body}</p>
                        </div>
                    )
                })}
                </div>
                
            </div>
        )
    }
}

export default ViewPost;