import React from 'react';
import './style.css';

function Container(props) {
    return(
        <div className="container">
            {props.results.map(result => (
                <div className="card" key={result.id}>
                    <div className="row">
                    <div className="col-sm-12 col-md-3 text-center">
                        <img className="company-logo" src={result.company_logo} />
                        <br></br>
                        <br />
                        <button className="btn add-btn">Add to My Wishlist</button>
                    </div>
                    <div className="col-sm-12 col-md-9">
                        <h1><strong>{result.company}</strong></h1>
                        <p><strong>Title: {result.title}</strong></p>
                        <div dangerouslySetInnerHTML={{ __html: result.description }}></div>
                    </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Container;