import React from 'react';
import Anna from './asset/AnnaSelfie.jpg';
import James from './asset/James.jpg';
import Haley from './asset/Haley.jpeg';
import './styles.css';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

function About() {
    return(
      <div>
          <div className="row appFeature">
            <div className="col-xs-12 col-md-3 pull-right feature-text"><CheckCircleOutlineIcon /> FAST AND EASY JOB SEARCH</div>
            <div className="col-xs-12 col-md-3 feature-text"><CheckCircleOutlineIcon /> OVERVIEW YOUR JOB PROGRESS BY STATUS</div>
            <div className="col-xs-12 col-md-3 feature-text"><CheckCircleOutlineIcon /> SAVE &amp; KEEP TRACK OF YOUR JOB JOURNEY</div>
            <div className="col-xs-12 col-md-3 feature-text"><CheckCircleOutlineIcon /> REMINDER FOR UPCOMING INTERVIEWS</div>
          </div>
          <div className="text-center about-us" style={{fontFamily: 'Shanti', fontSize: '1.2em'}}>
              <p>Service and maintenance companies typically process a high volume of low-value jobs. Without dedicated job management software it’s really difficult to keep track of jobs. Jobs might be logged manually or using spreadsheets. This doesn’t lend itself to sharing information, so in a busy environment, jobs get lost in the process. JobLogger software allows multiple people to log and view jobs at the same time. You can see the status of each job in real time as it progresses from creation to completion. Keeping both customers and management informed of jobs is easy and will give you the confidence to grow your service operation without having to take on more administration costs.</p>
              <p>Hunting for a new job is hard.  There are so many things to keep track of, contact information, details of how your interviews have gone, salaries, the list is endless.  JobLogger helps you keep track of all that in a central location, as well as offering a portal to search for jobs and easily save them.  You can track your employment opportunities, from a wishlist for things you want to apply to but haven't yet, all the way through to tracking the status of interviews and offers, to saving positions you've heard back on for future reference.  JobLogger is here to make the search easier for you so you can spend your time where it counts.</p>
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