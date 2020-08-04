import React from 'react';
import OverviewContainer from "../components/OverviewContainer"
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    // root: {
    //     '& > *': {
    //         margin: theme.spacing(1),
    //     },
    // },
    addButton: {
        [theme.breakpoints.down('xs')]: {
            position: 'absolute',
            bottom: theme.spacing(8),
            right: theme.spacing(2),
        },
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
        desktopAdd: {
            [theme.breakpoints.up('md')]: {
                display: 'block',
            },
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            },
            //   marginRight: theme.spacing(1),
        },
    },
}));



function Overview(){
    const classes = useStyles()
    return(
        <div style={{marginTop: '4rem'}}>
            <div className="sidebar">
                <Link to="/overview/overview-container" className="active"><i className="fa fa-fw fa-star"></i>  <span className="overview-link">Wishlists</span></Link>
                <Link to="/overview/applied"><i className="fa fa-fw fa-file"></i>  <span className="overview-link">Applied</span></Link>
                <Link to="/overview/interview"><i className="fa fa-fw fa-user-clock"></i>  <span className="overview-link">Interview</span></Link>
                <Link to="/overview/offer"><i className="fa fa-fw fa-thumbs-up"></i>  <span className="overview-link">Offer</span></Link>
                <Link to="/overview/reject"><i className="fa fa-fw fa-thumbs-down"></i>  <span className="overview-link">Reject</span></Link>
            </div>
            <OverviewContainer />
            <Fab color="primary" className={classes.addButton} aria-label="add post">
                <AddIcon />
            </Fab>
        </div>
    );
}
export default Overview;