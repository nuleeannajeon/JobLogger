import React from 'react';
import './style.css';

function OverviewInstruction(){
    return(
        <div>
            <div className="jumbotron jumbotron-fluid overview-jumbotron">
                <div className="container">
                    <h1 className="overview-jumbo-title">JOB LOGGING APPLICATION</h1>
                    <p className="overview-jumbo-text">Tracking the status and progress of jobs from wishlists to success.</p>
                    <button className="overview-jumbo-btn">REGISTER TO GET STARTED</button>
                </div>
            </div>

            <div className="instruction-container">
                <div className="row first-instruction">
                    <div className="col-xs-12 col-md-6">hello</div>
                    <div className="col-xs-12 col-md-6">
                        <h3>Navigate by progress</h3>
                        <p>JobLogger will help you visualize and track informatin by its status. 
                            Once you clicked on each side navigation bars, it populates the lists 
                            of key information of your job progress.</p>
                    </div>
                </div>
                <div className="row second-instruction">
                    <div className="col-xs-12 col-md-6">hello</div>
                    <div className="col-xs-12 col-md-6">
                        <h3>Key Information at a Glace</h3>
                        <p>Before you get into details, 
                            JobLogger will bring key information to help you 
                            easily find the post that you need. 
                            At any time you can create a new post, 
                            view and edit existing ones, 
                            and delete once you don't need it. 
                            Also you can save your job at anytime with information like
                            the posting URL, job title, 
                            salary, location, company and more
                        </p>
                    </div>
                </div>
                <div className="row third-instruction">
                    <div className="col-xs-12 col-md-6">hello</div>
                    <div className="col-xs-12 col-md-6">
                        <h3>Remind Yourself</h3>
                        <p>JobLogger will provide you with a powerful tools, Reminder, for every posts you make.
                            You can always remind yourself for next upcoming events and view it by its key information.
                        </p>
                    </div>
                </div>
                <div className="row fourth-instruction">
                    <div className="col-xs-12 col-md-6">hello</div>
                    <div className="col-xs-12 col-md-6">
                        <h3>Make it your Own!</h3>
                        <p>Every post can be coloured by your choice! 
                            Make it colourful so that the status of applications can be noticeable at a glance.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default OverviewInstruction;