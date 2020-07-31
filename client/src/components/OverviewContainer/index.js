import React from "react";
import './style.css';

function OverviewContainer(){ 
    return(
        <div>
            <div className="sidebar">
                <a className="active" href="#home"><i class="fa fa-fw fa-star"></i>  <span className="overview-link">Wishlists</span></a>
                <a href="#news"><i class="fa fa-fw fa-file"></i>  <span className="overview-link">Applied</span></a>
                <a href="#contact"><i class="fa fa-fw fa-user-clock"></i>  <span className="overview-link">Interview</span></a>
                <a href="#about"><i class="fa fa-fw fa-thumbs-up"></i>  <span className="overview-link">Offer</span></a>
                <a href="#about"><i class="fa fa-fw fa-thumbs-down"></i>  <span className="overview-link">Reject</span></a>
            </div>

            <div className="content">
                <h2>Wishlists</h2>
                <div className="media">
                    <div className="media-body">
                        <h6>Junior Web Developer</h6>
                        <img src="https://image.flaticon.com/teams/slug/google.jpg" alt=""/>
                        <span>Google</span>
                        <button>Delete</button>
                        <button>Details</button>
                    </div>
                </div>
            </div>
        </div>
        // <div className="overviewContainer">
        //     <div className="row">
        //         <div className="col">
        //             <h1>Wishlists</h1>
                    // <a className="btn jobBox media" onClick={()=>console.log(`Job`)}>
                    //     <img src="https://image.flaticon.com/teams/slug/google.jpg" alt=""/>
                    //     <div className="media-body">
                    //     <IconButton className="delete-btn" aria-label="delete" onClick={()=>console.log(`delete`)}>
                    //         <DeleteIcon fontSize="small"/>
                    //     </IconButton>
                    //         <h6>Junior Web Developer</h6>
                    //         <p>Google</p>
                    //     </div>
                    // </a>
        //         </div>
        //         <div className="col">
        //             <h1>Applied</h1>
        //         </div>
        //         <div className="col">
        //             <h1>Interview</h1>
        //         </div>
        //         <div className="col">
        //             <h1>Offer</h1>
        //         </div>
        //         <div className="col">
        //             <h1>Reject</h1>
        //         </div>
        //     </div>
        // </div>
    );
}

export default OverviewContainer;