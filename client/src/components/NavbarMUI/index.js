import React, {useState, useEffect, useRef} from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useGlobalStore } from '../GlobalStore';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu'
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

import MainSideNav from '../MainSideNav'

const useStyles = makeStyles((theme) => ({
    navbar: {},
    title: {
        fontFamily: 'Quando',
        fontWeight: 'bold',
    },
    titleLink: {
        color: 'inherit',
        marginRight: theme.spacing(2),
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
    },
}));

const NavbarMUI = () => {
    const classes = useStyles();
    const history = useHistory();

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [sidenavOpen, setSidenavOpen] = useState(false)

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

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    {/* <div className={classes.left}> */}
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/" className={classes.titleLink}>
                            JobLogger
                        </Link>
                    </Typography>
                    <NavLink to="/overview" activeClass={classes.activeLink} className={classes.navLink}>
                        Overview
                    </NavLink>
                    <NavLink to="/contacts" activeClass={classes.activeLink} className={classes.navLink}>
                        Contacts
                    </NavLink>
                    <NavLink
                        to="/search"
                        activeClass={classes.activeLink}
                        className={[classes.navLink, classes.left].join(' ')}
                    >
                        Search
                    </NavLink>
                    {/* <NavLink to="/overview" activeClass={classes.activeLink} className={classes.navLink}> */}
                    <IconButton
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        className={classes.iconButton}
                    >
                        <AccountCircleIcon />
                    </IconButton>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setSidenavOpen(true)}>
                        <MenuIcon />
                    </IconButton>
                    <MainSideNav open={sidenavOpen} setOpen={setSidenavOpen} />
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
                                            <MenuItem value="settings" onClick={handleClose('settings')}>
                                                My account
                                            </MenuItem>
                                            <MenuItem value="logout" onClick={handleClose('logout')}>
                                                Logout
                                            </MenuItem>
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
