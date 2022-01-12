import Posts from "./Posts"; 
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Home from "./Home";
import About from "./About";
import Login from "./Login";
import SignIn from "./SignIn";
import "../css/App.css";
import AddPost from "./AddPost";

function App() {
  
  localStorage.removeItem("username");
  localStorage.removeItem("userId");

  return (
    <div className = "container">
        <BrowserRouter>
          <div className = "navbar-top">
                <div className = "">
                  <Link to = "/"><h6 className = "tab-name">Home</h6></Link>
                </div>
                <div className = "">
                  <Link to = "/posts"><h6 className = "tab-name">All Posts</h6></Link>
                </div>
                <div className = "">
                  <Link to = "/createPost"><h6 className = "tab-name">Create Post</h6></Link>
                </div>
                <div className = "">
                  <Link to = "/about"><h6 className = "tab-name">About US</h6></Link>
                </div>
          </div>

          <Switch>
            <Route exact path = "/" component = {Home}/>
            <Route path = "/posts" component = {Posts}/> 
            <Route path = "/createPost" component = {AddPost}/>  
            <Route path = "/about" component = {About}/>
            <Route path = "/login" component = {Login}/>   
            <Route path = "/sign-in" component = {SignIn}/>       
          </Switch>

        </BrowserRouter>
    </div>
  )
}

export default App;
