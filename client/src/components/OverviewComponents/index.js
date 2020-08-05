import React from "react";
import './style.css';
import Posting from '../Posting/index';
// import { useGlobalStore } from '../GlobalStore';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {
    BrowserRouter as Router,
    useParams
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import ExistingPostModal from "../Modal/ExistingPostModal.js";
import NewPostModal from "../Modal/NewPostModal.js"

function Wishlists(props){
    let { topicId } = useParams();
    
    let dataListByType
    if (topicId === 'wishlists'){
        dataListByType = props.wishlists
    }
    else if (topicId === 'applied'){
        dataListByType = props.applied
    }
    else if (topicId === 'interview'){
        dataListByType = props.interview
    }
    else if (topicId === 'offer'){
        dataListByType = props.offer
    }
    else if (topicId === 'reject'){
        dataListByType = props.reject
    }

    return(
        <div className="content">
            <h2 className="overview-title">{topicId.charAt(0).toUpperCase() + topicId.slice(1)}
                {/* <NewPostModal rerender={props.rerender}/> */}
            </h2>
             
            {dataListByType ? dataListByType.map(
                posting => (
                    <div className='media' key={posting._id} id={posting.color}>
                        <div className="media-body">
                            <button className="box-delete-button"><i className="fas fa-trash-alt"></i></button>
                            <ExistingPostModal data={posting} rerender={props.rerender} />
                            <img src="https://image.flaticon.com/teams/slug/google.jpg" alt=""/>
                            <span>{posting.company ? posting.company : 'No defined company'}</span>
                            <div style={{paddingTop: "15px"}}>
                                <h6 style={{display: "inline-block"}}>{posting.title ? posting.title : "No defined Position"}</h6>
                                <p>{posting.location ? posting.location : 'No Location available'}, 
                                ${posting.salary ? posting.salary : '....'}/monthly</p>
                            </div>
                        </div>
                    </div>
                )
            ) : "You have no job data added in this section! Press add to enter them to get started!"}
        </div>
    );
}

export default Wishlists;

