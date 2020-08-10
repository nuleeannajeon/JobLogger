import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useGlobalStore } from '../GlobalStore';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import {
    IconButton,
    AppBar,
    Toolbar,
    Typography,
    Button,
    ClickAwayListener,
    Grow,
    Paper,
    Popper,
    MenuItem,
    MenuList,
} from '@material-ui/core';

import MainSideNav from '../MainSideNav';

const useStyles = makeStyles((theme) => ({
    navbar: {},
    title: {
        fontFamily: 'Quando',
        fontWeight: 'bold',
    },
    titleLink: {
        color: 'inherit',
        marginRight: theme.spacing(2),
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.4)',
        '&:hover': {
            color: '#cfe2e2',
            textDecoration: 'none',
        },
    },
    navLink: {
        color: 'inherit',
        marginRight: theme.spacing(2),
        '&:hover': {
            color: '#cfe2e2',
            textDecoration: 'none',
        },
    },
    activeLink: {
        textShadow: '0px 0px 4px #A16F4F',
        // color: '#8E6FA1',
    },
    left: {
        flexGrow: 1,
    },
    iconButton: {
        color: 'inherit',
    },
    zind: {
        zIndex: 1000,
    },
    menuButton: {
        display: 'none',
    },
    menuButtonLoggedOut: {
        display: 'none'
    },
    [theme.breakpoints.down('sm')]: {
        navLink: {
            display: 'none',
        },
        title: {
            flexGrow: 1,
        },
        iconButton: {
            display: 'none',
        },
        menuButton: {
            display: 'block',
        },
        menuButtonLoggedOut: {
            display: 'none'
        }
    },
}));

const NavbarMUI = () => {
    const classes = useStyles();
    const history = useHistory();
    const [globalStore] = useGlobalStore();

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [sidenavOpen, setSidenavOpen] = useState(false);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (linkURL) => (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        if (linkURL) {
            history.push(`/${linkURL}`);
        }
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    let titleClasses = [classes.title];
    if (!globalStore.loggedIn) {
        titleClasses.push(classes.left);
    }
    titleClasses = titleClasses.join(' ');

    const accountMenuLoggedIn = [
        <MenuItem key="settingsMenuItem" value="settings" onClick={handleClose('settings')}>
            My account
        </MenuItem>,
        <MenuItem key="logoutMenuItem" value="logout" onClick={handleClose('logout')}>
            Log out
        </MenuItem>,
    ];

    const accountMenuLoggedOut = (
        <MenuItem value="login" onClick={handleClose('entry')}>
            Log In
        </MenuItem>
    );

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    {/* <div className={classes.left}> */}
                    <Typography variant="h6" className={titleClasses}>
                        <Link to="/" className={classes.titleLink}>
                            JobLogger
                        </Link>
                    </Typography>
                    {globalStore.loggedIn && (
                        <>
                            <NavLink to="/overview" activeClassName={classes.activeLink} className={classes.navLink}>
                                Overview
                            </NavLink>
                            <NavLink to="/contacts" activeClassName={classes.activeLink} className={classes.navLink}>
                                Contacts
                            </NavLink>
                            <NavLink
                                to="/search"
                                activeClassName={classes.activeLink}
                                className={[classes.navLink, classes.left].join(' ')}
                            >
                                Search
                            </NavLink>
                        </>
                    )}
                    {/* <NavLink to="/overview" activeClass={classes.activeLink} className={classes.navLink}> */}
                    {globalStore.loggedIn && (
                        <NavLink className={classes.navLink} activeClassName={classes.activeLink} to="/reminders">
                            {globalStore.reminders ? <NotificationsActiveIcon /> : <NotificationsIcon />}
                        </NavLink>
                    )}
                    <IconButton
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        className={globalStore.loggedIn ? classes.iconButton : classes.iconButtonLoggedOut}
                    >
                        <AccountCircleIcon />
                    </IconButton>
                    <IconButton
                        edge="start"
                        className={globalStore.loggedIn ? classes.menuButton : classes.menuButtonLoggedOut}
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setSidenavOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    {globalStore.loggedIn && (
                        <MainSideNav loggedIn={globalStore.loggedIn} open={sidenavOpen} setOpen={setSidenavOpen} />
                    )}
                    <Popper
                        className={classes.zind}
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose()}>
                                        <MenuList
                                            autoFocusItem={open}
                                            id="menu-list-grow"
                                            onKeyDown={handleListKeyDown}
                                        >
                                            {globalStore.loggedIn ? accountMenuLoggedIn : accountMenuLoggedOut}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                    {/* </NavLink> */}
                    {/* </div> */}

                    {/* <Button color="inherit">Login</Button> */}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavbarMUI;
