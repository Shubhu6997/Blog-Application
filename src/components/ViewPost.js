import axios from "axios";
import React from "react";
import "../css/ViewPost.css";


class ViewPost extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            title : "",
            postBody : "",
            comments : []
            
        }
    }

    getComments = async()=>{
        try {
            const {data} = await axios.get(
                `https://jsonplaceholder.typicode.com/posts/${this.props.id}/comments`);
            this.setState({comments : [...data]})
            console.log(this.state.comments);
            console.log(this.props);
            
        } catch (error) {
            console.log("Error while fetching comments");
        }
        
    }
    componentDidMount(){
        this.getComments();
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
                <div className = "AddComment">
                    <textarea cols = "100" rows = "5" placeholder = "Write your comment"/>
                    <br/>
                    <button type = "submit" className = "btn btn-primary btn-sm">Add</button>
                </div>
                {this.state.comments.map((comment)=>{
                    return(
                        <div key = {comment.id}>
                            <p><b>Name :</b> {comment.name}</p>
                            <p><b>Email :</b> {comment.email}</p>
                            <p><b>Comment : </b>{comment.body}</p>
                        </div>
                    )
                })}
                </div>
                
            </div>
        )
    }
}

export default ViewPost;