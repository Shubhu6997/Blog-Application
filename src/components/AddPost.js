import React from "react";
import axios from "axios";

class AddPost extends React.Component{
    constructor(props){
        super(props);
        this.state={
            posts : [],
            id : this.props.id,
            userId : this.props.userId,
            title : this.props.title,
            body : this.props.body,
            action : this.props.action
        }
    }

    updatePost = async() =>{
        try{
            const {data : post} = await axios.put(
                `https://posts-app-backend.herokuapp.com/posts/${this.state.id}`,{
                 userId : this.state.userId,
                 title : this.state.title,
                 body : this.state.body
             });
             console.log(post);
             this.setState({posts : [], userId : "", title : "", body : ""});
             alert("Post Updated Successfully");
             
         }catch(err){
             console.log("Error while updating post", err);
         }
         
    }

    createPost = async()=>{
        try{
                await axios.post(
               "https://posts-app-backend.herokuapp.com/posts",{
                userId : this.state.userId,
                title : this.state.title,
                body : this.state.body
            });
            //console.log(res);
           
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
    
        return(
            <div className = "container-fluid">
                <h2>AddPost</h2>
                <div>
                    <form onSubmit = {this.handleSubmit}>
                            <div>
                                <label htmlFor = "userId">UserId</label><br/>
                                <input type = "number" 
                                name = "userId"
                                value = {this.state.userId}
                                onChange = {this.handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor = "title">Title</label><br/>
                                <input type = "text"
                                name = "title"
                                value = {this.state.title}
                                onChange = {this.handleChange}
                                />
                            </div>
                            <div>  
                                <label htmlFor = "body">Body</label><br/>
                                <textarea cols = "50" rows= "5"
                                name = "body"
                                value = {this.state.body}
                                onChange = {this.handleChange}
                                />
                            </div>
                                <button className = "btn-success" type = "submit">Add</button>
                            </form>
                    </div>
            </div>
        )
    }
}

export default AddPost;