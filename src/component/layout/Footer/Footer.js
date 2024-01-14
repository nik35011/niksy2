import React  from "react";
import playstore from "../../../images/playstore.png";
import Appstore  from "../../../images/Appstore.png";
import "./Footer.css";

const Footer=()=>{
    return (
    <footer id="footer">
        <div className="leftFooter">
          <h4>DOWNLOAD OUR APP</h4>
          <p>Download App fos Android and IOS mobile phone</p>
          <img src={playstore} alt="Playstore.png"></img>
          <img src={Appstore} alt="Appstore.png"></img>
        </div>

        <div className="midFooter">
        <h1>NIKSY</h1>
        <p>High Quality is our first priority</p>
        <p>Copyright 2023 &copy;me_nikhil</p>

        </div>

        <div className="rightFooter">
        <h4>FOLLOW US</h4>
        <a href="https://www.instagram.com/_nikhil_8187">Instagram</a>
        <a href="https://www.instagram.com/_nikhil_8187">Twitter</a>
        <a href="https://www.instagram.com/_nikhil_8187">LindekIn</a>

        </div>

    </footer>
    );
}

export default Footer;