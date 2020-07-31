import React from 'react';
import './styles.css';

function Jumbotron() {
    return(
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h2>Welcome to <br></br> <span className="display-4"> JobLogger</span></h2>
                <p className="lead">Sign up now for free to easily track your job hunting progress.</p>
                <a href='/' className="btn">SIGN UP NOW</a>
            </div>
        </div>
    )
}

export default Jumbotron;