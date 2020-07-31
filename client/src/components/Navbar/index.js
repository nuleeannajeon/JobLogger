import React from 'react';
import './styles.css';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg fixed-top">
            <a className="navbar-brand" href="/">JobLogger</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"><i class="fas fa-bars"></i></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="/">Overview</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/">My Account</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/">The Journey</a>
                </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    )
}

export default Navbar;