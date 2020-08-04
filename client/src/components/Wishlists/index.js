import React from "react";
import './style.css';
// import { Link } from "react-router-dom";
import Posting from '../Posting/index';
// import API from '../../utils/API'
// import { useGlobalStore } from '../GlobalStore';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

function Wishlists(props){
    console.log( props.data );
    const appliedList = props.data;

    return(
        <div className="content">
            <h2 className="overview-title">Wishlists
            <button 
                className="add-new-btn" 
                data-toggle="modal" 
                data-target="#exampleModal">
                <i className="fas fa-plus"></i>
            </button>
            </h2>
             
            {/* Commented Out this part: Error populating with "tabindex" // Invalid DOM 
            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add Your Wishlists</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Posting />
                    </div>
                    </div>
                </div>
            </div> */}

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

export default Wishlists;

