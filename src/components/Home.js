import HomePage from "../img/HomePage.jpg"
import "../css/Home.css";
function Home(){
    return(
        <div className = "container-fluid">
            <h1 className = "text-center">MAKE YOUR OWN BLOG WITH US</h1>
            <h2 className = "text-center">Lets Start!!!</h2>
            <img className = "homepage" src = {HomePage} alt = "Home Page Background"/>
        </div>
    )
}

export default Home;