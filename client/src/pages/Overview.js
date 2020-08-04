import React, {useState, useEffect} from 'react';
import Wishlists from "../components/Wishlists"
import Applied from "../components/Applied"
import Interview from "../components/Interview"
import Offer from "../components/Offer"
import Reject from "../components/Reject"
import API from '../utils/API'
// import Posting from '../components/Posting';
import { useGlobalStore } from '../components/GlobalStore';
import {
    BrowserRouter as Router,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom";
// import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    addButton: {
        [theme.breakpoints.down('xs')]: {
            position: 'absolute',
            bottom: theme.spacing(8),
            right: theme.spacing(2),
        },
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    desktopAdd: {
        [theme.breakpoints.up('md')]: {
            position: 'absolute',
            top: theme.spacing(10),
            right: theme.spacing(2),
            border: "1px solid cadetblue",
            color: "cadetblue",
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
        //   marginRight: theme.spacing(1),
    },
}));

function Overview(){
    let { path, url } = useRouteMatch();

    const classes = useStyles()

    const [globalStore, dispatch] = useGlobalStore();
    const [userPosts, setUserPosts] = useState([])
    const [wishlists, setWishlists] = useState([])
    const [applied, setApplied] = useState([])
    const [interview, setInterview] = useState([])
    const [offer, setOffer] = useState([])
    const [reject, setReject] = useState([])



    const getUserData = async () => {

        const userPostsData = await API.getUserPosts()
        console.log("getUserData -> userPostsData", userPostsData)

        const userPosts = userPostsData.message
        setUserPosts(userPosts)

        setWishlists(userPosts.filter(post => post.postingType==='wishlist'))
        setApplied(userPosts.filter(post => post.postingType==='applied'))
        setInterview(userPosts.filter(post => post.postingType==='interview'))
        setOffer(userPosts.filter(post => post.postingType==='offer'))
        setReject(userPosts.filter(post => post.postingType==='rejected'))

    }


    useEffect(()=>{
        getUserData()
    },[])

    return(
        <div style={{marginTop: '4rem'}}>
            <div className="sidebar">
                <Link to={`${url}/wishlists`} className={window.location.pathname === "/overview/wishlists" ? "active" : ""}><i className="fa fa-fw fa-star"></i>  <span className="overview-link">Wishlists</span></Link>
                <Link to={`${url}/applied`} className={window.location.pathname === "/overview/applied" ? "active" : ""}><i className="fa fa-fw fa-file"></i>  <span className="overview-link">Applied</span></Link>
                <Link to={`${url}/interview`} className={window.location.pathname === "/overview/interview" ? "active" : ""}><i className="fa fa-fw fa-user-clock"></i>  <span className="overview-link">Interview</span></Link>
                <Link to={`${url}/offer`} className={window.location.pathname === "/overview/offer" ? "active" : ""}><i className="fa fa-fw fa-thumbs-up"></i>  <span className="overview-link">Offer</span></Link>
                <Link to={`${url}/reject`} className={window.location.pathname === "/overview/reject" ? "active" : ""}><i className="fa fa-fw fa-thumbs-down"></i>  <span className="overview-link">Reject</span></Link>
            </div>
            
                <Route exact path={path}>
                    <div className="content">
                    <h3 className="overview-heading">Hi welcome to overview page. </h3>
                    Do you want to render Wishlists auto or Some instruction page for overview
                    <br />
                    and I added top right corner for addbutton :p Just to make it visible for all pages
                    </div>
                </Route>
                <Route path={`${path}/wishlists`}>
                    <Wishlists data={wishlists} />
                </Route>
                <Route path={`${path}/applied`}>
                    <Applied data={applied} />
                </Route>
                <Route path={`${path}/interview`}>
                    <Interview data={interview} />
                </Route>
                <Route path={`${path}/offer`}>
                    <Offer data={offer} />
                </Route>
                <Route path={`${path}/reject`}>
                    <Reject data={reject} />
                </Route>

                <Fab color="primary" className={classes.addButton} aria-label="add post">
                    <AddIcon />
                </Fab>
                <Button className={classes.desktopAdd} component={Link} to="/newpost">
                Add a post
                </Button>
        </div>
    );
}
export default Overview;