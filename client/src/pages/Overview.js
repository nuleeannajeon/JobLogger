import React, { useState, useEffect } from 'react';
import OverviewComponents from '../components/OverviewComponents';
import API from '../utils/API';
import { useGlobalStore } from '../components/GlobalStore';
import { BrowserRouter as Router, Switch, Route, Link, NavLink, useParams, useRouteMatch } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import NewPostModal from '../components/Modal/NewPostModal.js';
import ReminderMessage from '../components/ReminderMessage';
const useStyles = makeStyles((theme) => ({
    addButton: {
        [theme.breakpoints.down('xs')]: {
            position: 'fixed',
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
            border: '1px solid cadetblue',
            color: 'cadetblue',
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
        //   marginRight: theme.spacing(1),
    },
}));

function Overview() {
    let { path, url } = useRouteMatch();

    const classes = useStyles();

    const [globalStore, dispatch] = useGlobalStore();
    const [userPosts, setUserPosts] = useState([]);
    const [wishlists, setWishlists] = useState([]);
    const [applied, setApplied] = useState([]);
    const [interview, setInterview] = useState([]);
    const [offer, setOffer] = useState([]);
    const [reject, setReject] = useState([]);

    const getUserData = async () => {
        const userPostsData = await API.getUserPosts();
        const userPosts = userPostsData.message;

        setUserPosts(userPosts);

        setWishlists(userPosts.filter((post) => post.postingType === 'wishlists'));
        setApplied(userPosts.filter((post) => post.postingType === 'applied'));
        setInterview(userPosts.filter((post) => post.postingType === 'interview'));
        setOffer(userPosts.filter((post) => post.postingType === 'offer'));
        setReject(userPosts.filter((post) => post.postingType === 'reject'));

        const userData = await API.getUserData();
        dispatch({ do: 'setUserData', ...userData });
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div style={{ marginTop: '4rem', borderTop: '1px solid #f1f1f1fb' }}>
            <ReminderMessage />
            <div className="sidebar">
                <NavLink to={`${url}/wishlists`} activeClassName="active">
                    <i className="fa fa-fw fa-star"></i> <span className="overview-link">Wishlists</span>
                </NavLink>
                <NavLink to={`${url}/applied`} activeClassName="active">
                    <i className="fa fa-fw fa-file"></i> <span className="overview-link">Applied</span>
                </NavLink>
                <NavLink to={`${url}/interview`} activeClassName="active">
                    <i className="fa fa-fw fa-user-clock"></i> <span className="overview-link">Interview</span>
                </NavLink>
                <NavLink to={`${url}/offer`} activeClassName="active">
                    <i className="fa fa-fw fa-thumbs-up"></i> <span className="overview-link">Offer</span>
                </NavLink>
                <NavLink to={`${url}/reject`} activeClassName="active">
                    <i className="fa fa-fw fa-thumbs-down"></i> <span className="overview-link">Reject</span>
                </NavLink>
            </div>
            <NewPostModal rerender={getUserData} />
            <Switch>
                <Route exact path={path}>
                    <div className="content">
                        <h3 className="overview-heading">Hi welcome to overview page. </h3>
                        Do you want to render Wishlists auto or Some instruction page for overview
                        <br />
                        and I added top right corner for addbutton :p Just to make it visible for all pages
                    </div>
                </Route>
                <Route path={`${path}/:topicId`}>
                    <OverviewComponents
                        wishlists={wishlists}
                        applied={applied}
                        interview={interview}
                        offer={offer}
                        reject={reject}
                        rerender={getUserData}
                    />
                </Route>
            </Switch>

            
        </div>
    );
}
export default Overview;
