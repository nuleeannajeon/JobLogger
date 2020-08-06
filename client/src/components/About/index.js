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
          <div className="text-center about-us">
              <p>Service and maintenance companies typically process a high volume of low-value jobs. Without dedicated job management software it’s really difficult to keep track of jobs. Jobs might be logged manually or using spreadsheets. This doesn’t lend itself to sharing information, so in a busy environment, jobs get lost in the process. Joblogic helpdesk software allows multiple people to log and view jobs at the same time. You can see the status of each job in real time as it progresses from creation to completion. Keeping both customers and management informed of jobs is easy and will give you the confidence to grow your service operation without having to take on more administration costs.</p>
          </div>
          <div className="container text-center avatar-container">
              <img className="avatar" src={Haley} alt="Card image cap" />
              <img className="avatar" src={James} alt="Card image cap" />
              <img className="avatar" src={Anna} alt="Card image cap" />
          </div>
      </div>
    )
}

export default About;