import React from 'react';
import OverviewContainer from "../components/OverviewContainer"
import { Link } from "react-router-dom";

function Overview(){
    return(
        <div style={{marginTop: '4rem'}}>
            <div className="sidebar">
                <Link to="/overview/overview-container" className="active"><i class="fa fa-fw fa-star"></i>  <span className="overview-link">Wishlists</span></Link>
                <Link to="/overview/applied"><i class="fa fa-fw fa-file"></i>  <span className="overview-link">Applied</span></Link>
                <Link to="/overview/interview"><i class="fa fa-fw fa-user-clock"></i>  <span className="overview-link">Interview</span></Link>
                <Link to="/overview/offer"><i class="fa fa-fw fa-thumbs-up"></i>  <span className="overview-link">Offer</span></Link>
                <Link to="/overview/reject"><i class="fa fa-fw fa-thumbs-down"></i>  <span className="overview-link">Reject</span></Link>
            </div>
            {/* <OverviewContainer /> */}
        </div>
    );
}
export default Overview;