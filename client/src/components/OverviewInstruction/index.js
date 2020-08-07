import React from 'react';
import './style.css';
import NavigationImage from './navigation.png';
import GlanceImage from './glance.png';
import ColorImage from './color.png';
import ReminderImage from './reminder.png';

function OverviewInstruction(){
    return(
        <div>
            <div className="instruction-container">
                <div className="row align-items-center first-instruction">
                    <div className="col-md-12 col-lg-6"><img className="instruction-image img-fluid" src={NavigationImage} alt="joblogger-navigation"/></div>
                    <div className="col-md-12 col-lg-6 pr-2 pl-4">
                        <h3>Navigate by progress</h3>
                        <p>JobLogger will help you visualize and track information by its status. 
                            Once you've clicked on each side navigation bars, it populates the lists 
                            of key information of your job searching progress.</p>
                    </div>
                </div>
                <div className="row align-items-center second-instruction">
                    <div className="col-md-12 col-lg-6 order-lg-last"><img className="instruction-image img-fluid" src={GlanceImage} alt="joblogger-instruction"/></div>
                    <div className="col-md-12 col-lg-6 order-lg-first pr-2 pl-4">
                        <h3>Key Information at a Glance</h3>
                        <p>Before you get into details, 
                            JobLogger will bring key information to help you 
                            easily find the post that you need. 
                            At any time you can create a new post, 
                            view and edit existing ones, 
                            and delete them. 
                            Also you can save your job at any time with information like
                            the posting URL, job title, 
                            salary, location, company and more
                        </p>
                    </div>
                </div>
                <div className="row align-items-center third-instruction">
                    <div className="col-md-12 col-lg-6"><img className="instruction-image img-fluid" src={ColorImage} alt="joblogger-instruction"/></div>
                    <div className="col-md-12 col-lg-6 pr-2 pl-4">
                        <h3>Make it your Own!</h3>
                        <p>Every post can be coloured by your choice! 
                            Make it colourful so that the status of applications can be noticeable at a glance.
                        </p>
                    </div>
                </div>
                <div className="row align-items-center fourth-instruction justify-content-around">
                    <div className="col-md-12 col-lg-6 order-lg-last"><img className="instruction-image img-fluid" src={ReminderImage} alt="joblogger-instruction"/></div>
                    <div className="col-md-12 col-lg-6 order-lg-first pr-2 pl-4">
                        <h3>Remind Yourself</h3>
                        <p>JobLogger will provide you with a powerful tool, Reminder, for every posts you make.
                            You can always remind yourself of your next upcoming event and see it's key information.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default OverviewInstruction;