import HomePage from "../img/HomePage.jpg"
import { Link } from "react-router-dom";
import "../css/Home.css";
function Home(){
    return(
        <div className = "container-fluid home">
            <div>
                <h1 className = "text-center home-title">MAKE YOUR OWN BLOG WITH US</h1>
                <h2 className = "text-center home-title">Lets Start!!!</h2>
            </div>
            <img className = "homepage" src = {HomePage} alt = "Home Page Background"/>
            <div className = "text-center">
                <button className = "btn btn-primary m-1">
                    <Link to = "/login"><h5 className = "text-white">Login</h5></Link>
                </button>
                <button className = "btn btn-primary m-1">
                    <Link to = "/sign-in"><h5 className = "text-white">Sign up</h5></Link>
                </button>
            </div>
        </div>
    )
}

export default Home;