import React, {useEffect, useState} from "react";
import './style.css';
import { Link } from "react-router-dom";
import Posting from '../Posting/index';
import API from '../../utils/API'
import { useGlobalStore } from '../GlobalStore';

function OverviewContainer(){ 
    const [globalStore, dispatch] = useGlobalStore();
    const [userPosts, setUserPosts] = useState([])
    const [wishlist, setWishlist] = useState([])
    const [applied, setApplied] = useState([])
    const [offer, setOffer] = useState([])
    const [interview, setInterview] = useState([])
    const [rejected, setRejected] = useState([])



    const getUserData = async () => {
        const userPostsData = await API.getUserPosts()
        console.log("getUserData -> userPostsData", userPostsData)
        // const userPosts = userPostsData.message


        //filter for wishlist
        // setWishlist(userPosts.filter(post => post.postingType === 'wishlist'))



        // setUserPosts(userPostsData.message)
    }


    useEffect(()=>{
        getUserData()
    },[])
    


    return(
        <div>
            <div className="sidebar">
                <Link to="/overview/overview-container" className={window.location.pathname === "/overview/overview-container" ? "active" : ""}><i class="fa fa-fw fa-star"></i>  <span className="overview-link">Wishlists</span></Link>
                <Link to="/overview/applied" className={window.location.pathname === "/overview/applied" ? "active" : ""}><i class="fa fa-fw fa-file"></i>  <span className="overview-link">Applied</span></Link>
                <Link to="/overview/interview" className={window.location.pathname === "/overview/interview" ? "active" : ""}><i class="fa fa-fw fa-user-clock"></i>  <span className="overview-link">Interview</span></Link>
                <Link to="/overview/offer" className={window.location.pathname === "/overview/offer" ? "active" : ""}><i class="fa fa-fw fa-thumbs-up"></i>  <span className="overview-link">Offer</span></Link>
                <Link to="/overview/reject" className={window.location.pathname === "/overview/reject" ? "active" : ""}><i class="fa fa-fw fa-thumbs-down"></i>  <span className="overview-link">Reject</span></Link>
            </div>
            <div className="content ">
                <h2>Wishlists <button className="add-btn" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-plus"></i></button></h2>
                {/* {wislist.map(posting => <Wishlist {...posting} />)}  <--- the spread operator will assign each value to a prop, so dateAdded would be in props.dateAdded in the component */}
                {/* {userPosts.map(post => post.company)} */}
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Add Your Wishlists</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <Posting />
                        </div>
                        </div>
                    </div>
                </div>
                <div className="media">

                    <div className="media-body">
                        <button className="box-delete-button"><i class="fas fa-trash-alt"></i></button>
                        <button className="box-view-button">View/Edit</button>
                        <img src="https://image.flaticon.com/teams/slug/google.jpg" alt=""/>
                        <span>Google</span>
                        <div style={{paddingTop: "15px"}}>
                            <h6 style={{display: "inline-block"}}>Junior Web Developer</h6>
                            <p>Toronto, ON $20000/monthly</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default OverviewContainer;