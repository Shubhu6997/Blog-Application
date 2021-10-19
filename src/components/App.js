import Posts from "./Posts"; 
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Home from "./Home";
import About from "./About";
import Login from "./Login";
import SignIn from "./SignIn";
import "../css/App.css";

function App() {
  return (
    <div className = "container-fluid p-0">
        <BrowserRouter>
          <div className = "d-flex flex-row">
            <div className = "d-flex flex-row bg-success flex-fill">
                <div className = "p-3 flex-fill">
                  <Link to = "/"><h5 className = "text-white">Home</h5></Link>
                </div>
                <div className = "p-3 flex-fill">
                  <Link to = "/posts"><h5 className = "text-white">Posts</h5></Link>
                </div>
                <div className = "p-3 flex-fill">
                  <Link to = "/about"><h5 className = "text-white">About US</h5></Link>
                </div>
                <div className = "p-3 flex-fill">
                  <Link to = "/login"><h5 className = "text-white">Login</h5></Link>
                </div >
                <div className = "p-3 flex-fill"> 
                  <Link to = "/sign-in"><h5 className = "text-white">Sign up</h5></Link>
                </div>
            </div>
          </div>

          <Switch>
            <Route exact path = "/" component = {Home}/>
            <Route path = "/posts" component = {Posts}/>     
            <Route path = "/about" component = {About}/>
            <Route path = "/login" component = {Login}/>   
            <Route path = "/sign-in" component = {SignIn}/>       
          </Switch>

        </BrowserRouter>
    </div>
  )
}

export default App;
