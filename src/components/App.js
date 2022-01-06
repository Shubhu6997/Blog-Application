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
    <div className = "container-fluid p-0">
        <BrowserRouter>
          <div className = "d-flex flex-row app-container">
            <div className = "d-flex flex-row bg-success flex-fill">
                <div className = "p-3 flex-fill">
                  <Link to = "/"><h2 className = "text-white tabs">Home</h2></Link>
                </div>
                <div className = "p-3 flex-fill">
                  <Link to = "/posts"><h5 className = "text-white tabs">All Posts</h5></Link>
                </div>
                <div className = "p-3 flex-fill">
                  <Link to = "/createPost"><h5 className = "text-white tabs">Create Post</h5></Link>
                </div>
                <div className = "p-3 flex-fill">
                  <Link to = "/about"><h5 className = "text-white tabs">About US</h5></Link>
                </div>

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
