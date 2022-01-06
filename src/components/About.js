import "../css/About.css";
import Profile_Pic from "../img/Profile_Pic.jpg";
function About(){
    return(
        <div class = "container mt-4">
            <div className = "about_container">
            <img className = "profile_pic" src = {Profile_Pic} alt = "Profile Pic"></img>
            </div>
                <h3>Shubham Haval</h3>
                <h5>Software Developer as Amdocs</h5>
            <div>
                
            </div>
         
        </div>
    )
}


export default About;
