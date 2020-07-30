import React from 'react';
import Anna from './asset/AnnaSelfie.jpg';
import James from './asset/JamestheBetter.jpg';
import Haley from './asset/Haley.jpeg';
import './styles.css';

function About() {
    return(
    <div className="container">
      <h1>About Us</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      <img className="avatar" src={Haley} alt="Card image cap" />
      <img className="avatar" src={James} alt="Card image cap" />
      <img className="avatar" src={Anna} alt="Card image cap" />
    </div>
    )
}

export default About;