import Jumbotron from '../components/Jumbotron/index';
import About from '../components/About/index';
import API from '../utils/API';
import { useGlobalStore } from '../components/GlobalStore';

import React, { useEffect } from 'react';

const Home = () => {
    const [globalStore, dispatch] = useGlobalStore();
    
    const checkLoggedIn = async () => {
        const loggedInReturn = await API.getLoggedState();
        console.log("checkLoggedIn -> loggedInReturn", loggedInReturn)
        if (loggedInReturn === true) {
            dispatch({ do: 'login'});
            getUserData()
        }
    };

    const getUserData = async () => {
        const userData = await API.getUserData();
        console.log("getUserData -> userData", userData)
        dispatch({ do: 'setUserData', ...userData });
    };

    useEffect(() => {
        checkLoggedIn();
    }, []);

    return (
        <div>
            <Jumbotron />
            <About />
        </div>
    );
};

export default Home;
