import React, { useState } from 'react';
import { Button, List, Divider, ListItem, ListItemIcon, ListItemText, SwipeableDrawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
    navList: {
        width: 200,
        backgroundColor: theme.palette.primary.main ,//'#438171',
        color: 'white',
        height: '100%',
        paddingLeft: 5,
    },
    navListItem: {
        fontFamily: 'Varela Round',
    },
    listItem: {
        fontSize: '2em',
    },
    drawer: {
        // backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
}));

const MainSideNav = (props) => {
    const classes = useStyles();
    const { open, setOpen, loggedIn } = props;

    const toggleDrawer = (state) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(state);
    };

    return (
        <div>
            <SwipeableDrawer
                anchor="right"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                className={classes.drawer}
            >
                <div className={classes.navList} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                    <List style={{ paddingTop: '1em' }}>
                        <ListItem button component={Link} to="/overview" className={classes.listItem}>
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText primary="Overview" />
                        </ListItem>
                        <ListItem button component={Link} to="/contacts">
                            <ListItemIcon><PermContactCalendarIcon /></ListItemIcon>
                            <ListItemText primary="Contacts" />
                        </ListItem>
                        <ListItem button component={Link} to="/search">
                            <ListItemIcon><SearchIcon /></ListItemIcon>
                            <ListItemText primary="Search" />
                        </ListItem>
                        <Divider />
                        <ListItem button component={Link} to="/settings">
                            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                            <ListItemText primary="My Profile" />
                        </ListItem>
                        <ListItem button component={Link} to="/logout">
                            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                            <ListItemText primary="Log Out" />
                        </ListItem>
                    </List>
                </div>
            </SwipeableDrawer>
        </div>
    );
};

export default MainSideNav;
