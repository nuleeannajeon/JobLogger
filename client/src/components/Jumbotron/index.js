import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalStore } from '../GlobalStore';
import './styles.css';

function Jumbotron() {
    const [globalStore,] = useGlobalStore();
    return (
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h2>
                    Welcome to <br></br> <span className="display-4"> JobLogger</span>
                </h2>
                {globalStore.loggedIn ? (
                    <p className="lead">Welcome back {globalStore.name}</p>
                ) : (
                    <>
                        <p className="lead">Sign up now for free to easily track your job hunting progress.</p>
                        <Link to="/register" className="btn">
                            SIGN UP NOW
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Jumbotron;
