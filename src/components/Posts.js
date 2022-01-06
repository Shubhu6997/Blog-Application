import { Component } from "react";
import axios from "axios";
import ViewPost from "./ViewPost";
import AddPost from "./AddPost";
import "../css/Posts.css"
import { Link } from "react-router-dom";

class Posts extends Component{
    constructor(props){
        super(props);
        this.state = {
            posts : [],
            id : "",
            userId : "",
            title : "",
            body : "",
            action : "posts",
        };
        
    }

    viewAddPost=(post, view)=>{

        console.log("viewAddPost method called")
        var res = this.state.posts.filter(obj =>{return obj.id === post.id});
        localStorage.setItem("postId",res[0].id);
        console.log("result",res);
        this.setState(
            {
                action : view, 
                id : res[0].id, 
                title : res[0].title, 
                body : res[0].body
            }
        ); 
     

      
    }

    addPost = (view) =>{
        if(localStorage.getItem('username')){
            console.log(localStorage.getItem('username'));
            this.setState({action : view})
        }else{
            alert("Please login to add post");
        }
       
    }
   
  
    getPosts = async()=>{
        try{
            this.setState({posts : []})
            const {data} = await axios.get(
                "http://localhost:3001/posts");
            this.setState({posts : data});
            console.log(data);

    }catch(err){
        console.log("Error while fetching data from server",err);
        }
    }

    deletePost = async(postId) =>{
        console.log(postId);
        let res = window.confirm("Are you sure that you wants to delete this post?");
        if(res)
        {
            try{
                let {data} = await axios.delete(`http://localhost:3001/posts/${postId}`,{
                   data :{ userId : localStorage.getItem("userId")}
                });
                this.setState({posts : []});
                alert(data);
                this.getPosts();
               
            }catch(err){
                console.log("Error while deleting post");
            }
        }
        
    }


    componentDidMount(){
        this.getPosts();
    }
   

    selectPostToUpdate = (post) =>{
        console.log(post);
        this.setState({
            id : post.id,
            userId : post.userId,
            title : post.title,
            body : post.body,
            action : "updatepost"
        })

    }
   
    render(){
       return(
        <div className = "container">

            {(()=>{switch(this.state.action){
                case 'posts' : 
                    return (
                    <div>
                        <div className = "m-3">
                        <button className = "AddPostButton btn btn-info" type = "button" 
                        onClick = {()=>this.addPost("addpost")}>AddPost</button>

                            <table className = "table table-striped table-bordered mt-2">
                                <tbody>
                                {this.state.posts.map((post)=>{
                                    return(
                                        <tr key = {post.id}>
                                            <td>
                                                <td><h3>{post.title}</h3></td>
                                                <tr>
                                                <td className = "p-2">{post.body}</td>
                                                </tr>
                                                
                                                <div className = "btn-group" role = "group">
                                                    <button type = "button" 
                                                    className = ""
                                                    onClick = {()=>this.viewAddPost(post, "view")}>
                                                        <Link to = "/posts/viewpost">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                                        </svg>
                                                        </Link></button>
                                                    <button type = "button"
                                                    className = ""
                                                    onClick = {()=>this.deletePost(post.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                        </svg>
                                                   </button>
                                                    <button type = "button" 
                                                    className = ""
                                                    onClick = {()=>this.selectPostToUpdate(post)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                        </svg>
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>    
                                    );
                                })}
                                </tbody>
                            </table>
                        </div> 
                    </div>
                
                    )
                case 'view' : 
                    return(
                        <ViewPost id = {this.state.id} 
                        title = {this.state.title} 
                        body = {this.state.body} />
                    )
                case 'addpost' : 
                    return(<AddPost action = "addpost"/>
                    )
                case 'updatepost' : 
                    return(<AddPost id = {this.state.id} 
                            userId = {this.state.userId} 
                            title = {this.state.title}
                            body = {this.state.body}
                            action = "updatepost"
                            />
                    )
                default : return(<></>)
            }})()} 
                
                
        </div>
       
        )
    }
    
}

export default Posts;