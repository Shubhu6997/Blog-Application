import { Component } from "react";
import axios from "axios";
import ViewPost from "./ViewPost";
import AddPost from "./AddPost";
import "../css/Posts.css"

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
        
        //console.log("post",post)
        var res = this.state.posts.filter(obj =>{return obj.id === post.id});
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
        this.setState({action : view})
    }
   
  
    getPosts = async()=>{
        try{
            this.setState({posts : []})
            const {data} = await axios.get(
                "https://posts-app-backend.herokuapp.com/posts");
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
                await axios.delete(`https://posts-app-backend.herokuapp.com/posts/${postId}`);
                this.setState({posts : []});
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
                        <button className = "AddPostButton" type = "button" 
                        className = "btn btn-info"
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
                                                    className = "btn btn-info btn-sm"
                                                    onClick = {()=>this.viewAddPost(post, "view")}>View</button>
                                                    <button type = "button"
                                                    className = "btn btn-danger btn-sm"
                                                    onClick = {()=>this.deletePost(post.id)}>Delete</button>
                                                    <button type = "button" 
                                                    className = "btn btn-primary btn-sm"
                                                    onClick = {()=>this.selectPostToUpdate(post)}
                                                    >Update</button>

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
            }})()} 
                
                
        </div>
       
        )
    }
    
}

export default Posts;