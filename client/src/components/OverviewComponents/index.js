import React from "react";
import './style.css';
import API from '../../utils/API';
import {
    BrowserRouter as Router,
    useParams
} from "react-router-dom";
import ExistingPostModal from "../Modal/ExistingPostModal.js";
import processServerReturn from '../../utils/processServerReturn';
import { useGlobalStore } from '../GlobalStore';
import companyLogo from './location-symbol2.png'

function Wishlists(props){
    const [globalStore, dispatch] = useGlobalStore();
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

    async function handleDelete(id){
        const serverResponse = await API.delete(`/api/posts/${id}`);
        setTimeout( function(){
            props.rerender()
        }, 1000)
        processServerReturn(serverResponse, dispatch)
        return !serverResponse.error
    }

    return(
        <div className="content">
            <h2 className="overview-title">{topicId.charAt(0).toUpperCase() + topicId.slice(1)}
            </h2>
             
            {dataListByType ? dataListByType.map(
                posting => (
                    <div className='media' key={posting._id} id={posting.color}>
                        <div className="media-body">
                            <button className="box-delete-button" onClick={() => handleDelete(posting._id)}><i className="fas fa-trash-alt"></i></button>
                            <ExistingPostModal data={posting} rerender={props.rerender} />
                            <img src={posting.companyLogoImage ? posting.companyLogoImage : companyLogo} alt={posting.compnay ? posting.company : ''}/>
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

