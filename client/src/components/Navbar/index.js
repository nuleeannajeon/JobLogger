import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useGlobalStore } from '../GlobalStore';
import './styles.css';

const LoginButton = () => (
    <Link to="/entry" className="btn btn-outline-dark my-2 my-sm-0" type="submit">
        Login
    </Link>
);
const LogoffButton = () => (
    <Link to="/logout" className="btn btn-outline-dark my-2 my-sm-0" type="submit">
        Logout
    </Link>
);

function Navbar() {
    const [globalStore] = useGlobalStore();

    return (
        <nav className="navbar navbar-expand-lg fixed-top">
            <Link className="navbar-brand" to="/">
                JobLogger
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbar"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
            <span className="navbar-toggler-icon">
                <i className="fas fa-bars"></i>
            </span>
            </button>

            <div className="collapse navbar-collapse" id="navbar">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/overview">
                            Overview
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/settings">
                            My Account
                        </Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link" to="/myjourney">
                            My Journey
                        </Link>
                    </li> */}
                    <li className="nav-item">
                        <Link className="nav-link" to="/search">
                            Search
                        </Link>
                    </li>
                </ul>
                {/* <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-dark my-2 my-sm-0 mr-2" type="submit">
                        Search
                    </button>
                </form> */}

                <NavLink className="nav-link" activeClassName="active" to="/reminders">
                    {globalStore.reminders ? <NotificationsActiveIcon /> : <NotificationsIcon />}
                </NavLink>
                {globalStore.loggedIn ? <LogoffButton /> : <LoginButton />}
            </div>
        </nav>
    );
}

export default Navbar;
