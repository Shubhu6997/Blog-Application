import { Component } from "react";
import axios from "axios";
import ViewPost from "./ViewPost";
import AddPost from "./AddPost";
import "../css/Posts.css"
import { Link } from "react-router-dom";
import  DeleteIcon  from "@material-ui/icons/Delete";
import PreviewIcon from '@mui/icons-material/Preview';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { IconButton } from "@mui/material";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

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
                                                
                                                <div className="icon-group">
                                                    <IconButton 
                                                    onClick = {()=>this.viewAddPost(post, "view")}>
                                                        <Link to = "/posts/viewpost"> 
                                                            <VisibilityOutlinedIcon/>
                                                        </Link>
                                                    </IconButton>

                                                    <IconButton
                                                    onClick = {()=>this.deletePost(post.id)}>
                                                         <DeleteIcon/>
                                                   </IconButton>

                                                    <IconButton 
                                                    onClick = {()=>this.selectPostToUpdate(post)}>
                                                       <EditTwoToneIcon/>
                                                    </IconButton>

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