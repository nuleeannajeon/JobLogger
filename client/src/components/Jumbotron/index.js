import React from 'react';
import './styles.css';

function Jumbotron() {
    return(
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4">JobLogger</h1>
                <p className="lead">Easily track your job hunting progress!</p>
            </div>
        </div>
    )
}

export default Jumbotron;