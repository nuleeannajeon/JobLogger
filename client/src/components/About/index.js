import React from 'react';
import Anna from './asset/AnnaSelfie.jpg';
import James from './asset/James.jpg';
import Haley from './asset/Haley.jpeg';
import './styles.css';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

function About() {
    return(
      <div>
          <div className="row appFeature text-center">
            <div className="col-xs-6 col-md-3"><CheckCircleOutlineIcon /> FAST AND EASY JOB SEARCH</div>
            <div className="col-xs-6 col-md-3"><CheckCircleOutlineIcon /> OVERVIEW YOUR JOB PROGRESS BY STATUS</div>
            <div className="col-xs-6 col-md-3"><CheckCircleOutlineIcon /> SAVE AND KEEP TRACK OF YOUR JOB JOURNEY</div>
            <div className="col-xs-6 col-md-3"><CheckCircleOutlineIcon /> REMINDER FOR UPCOMING INTERVIEWS</div>
          </div>
          <div className="container text-center">
              <h1>About Us</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <img className="avatar" src={Haley} alt="Card image cap" />
              <img className="avatar" src={James} alt="Card image cap" />
              <img className="avatar" src={Anna} alt="Card image cap" />
          </div>
      </div>
    )
}

export default About;