import React, { useState, useEffect } from 'react';
import OverviewComponents from '../components/OverviewComponents';
import API from '../utils/API';
import { useGlobalStore } from '../components/GlobalStore';
import { Switch, Route, NavLink, useRouteMatch } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';
import NewPostModal from '../components/Modal/NewPostModal.js';
import ReminderMessage from '../components/ReminderMessage';
import { useHistory } from 'react-router-dom';
import OverviewInstruction from '../components/OverviewInstruction';

// const useStyles = makeStyles((theme) => ({
//     addButton: {
//         [theme.breakpoints.down('xs')]: {
//             position: 'fixed',
//             bottom: theme.spacing(8),
//             right: theme.spacing(2),
//         },
//         [theme.breakpoints.up('sm')]: {
//             display: 'none',
//         },
//     },
//     desktopAdd: {
//         [theme.breakpoints.up('md')]: {
//             position: 'absolute',
//             top: theme.spacing(10),
//             right: theme.spacing(2),
//             border: '1px solid cadetblue',
//             color: 'cadetblue',
//         },
//         [theme.breakpoints.down('sm')]: {
//             display: 'none',
//         },
//         //   marginRight: theme.spacing(1),
//     },
// }));

function Overview() {
    let { path, url } = useRouteMatch();
    const history = useHistory();

    // const classes = useStyles();

    const [, dispatch] = useGlobalStore();
    //eslint-disable-next-line
    const [userPosts, setUserPosts] = useState([]);
    const [wishlists, setWishlists] = useState([]);
    const [applied, setApplied] = useState([]);
    const [interview, setInterview] = useState([]);
    const [offer, setOffer] = useState([]);
    const [reject, setReject] = useState([]);
    const [welcomeText, setWelcomeText] = useState('');

    const getUserData = async () => {
        const userPostsData = await API.getUserPosts().then(resp => resp.message);

        setUserPosts(userPostsData);

        setWishlists(userPostsData.filter((post) => post.postingType === 'wishlists'));
        setApplied(userPostsData.filter((post) => post.postingType === 'applied'));
        setInterview(userPostsData.filter((post) => post.postingType === 'interview'));
        setOffer(userPostsData.filter((post) => post.postingType === 'offer'));
        setReject(userPostsData.filter((post) => post.postingType === 'reject'));

        const userData = await API.getUserData();
        dispatch({ do: 'setUserData', ...userData });

        if (userPostsData.length === 0) {
            setWelcomeText(<OverviewInstruction />);
        } else {
            setWelcomeText('');
            if (history.location.pathname === '/overview') {
                history.push('/overview/wishlists');
            }
            // if (wishlists.length > 0){
            //     return
            // }
            // if (applied.length > 0){
            //     history.push('/overview/applied')
            //     return
            // }
            // console.log("getUserData -> applied.length", applied.length)
            // if (interview.length > 0){
            //     history.push('/overview/interview')
            //     return
            // }
            // if (offer.length > 0){
            //     history.push('/overview/offer')
            //     return
            // }
            // if (reject.length > 0){
            //     history.push('/overview/reject')
            //     return
            // }
        }
    };

    useEffect(() => {
        getUserData();
        //eslint-disable-next-line
    }, []);

    return (
        <div style={{ borderTop: '1px solid #f1f1f1fb', position: 'relative' }}>
            <ReminderMessage />
            <div className="sidebar" style={{ fontFamily: 'Varela Round' }}>
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
                    <div className="content">{welcomeText}</div>
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
