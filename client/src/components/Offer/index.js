import React from "react";
import './style.css';
// import { Link } from "react-router-dom";
// import Posting from '../Posting/index';
// import API from '../../utils/API'
// import { useGlobalStore } from '../GlobalStore';

function Offer(props){
    console.log( props.data )
    const appliedList = props.data
    return(
        <div className="content">
            <h2>Offer</h2>
            {appliedList ? appliedList.map(
                posting => (
                    <div className="media" key={posting._id}>
                        <div className="media-body">
                            <button className="box-delete-button"><i className="fas fa-trash-alt"></i></button>
                            <button className="box-view-button">View/Edit</button>
                            <img src="https://image.flaticon.com/teams/slug/google.jpg" alt=""/>
                            <span>{posting.company ? posting.company : 'No defined company'}</span>
                            <div style={{paddingTop: "15px"}}>
                                <h6 style={{display: "inline-block"}}>{posting.title ? posting.title : "No defined Position"}</h6>
                                <p>{posting.location ? posting.location : 'No Location available'}, 
                                ON ${posting.salary ? posting.salary : '....'}/monthly</p>
                            </div>
                        </div>
                    </div>
                )
            ) : "You have no applied jobs! Press add to enter them to get started!"}    
        </div>
    );
}

export default Offer;