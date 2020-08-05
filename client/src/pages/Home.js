import Jumbotron from '../components/Jumbotron/index';
import About from '../components/About/index';
import LabelBottomNavigation from '../components/BottomNav/index';
import API from '../utils/API';
import { useGlobalStore } from '../components/GlobalStore';

import React, { useEffect } from 'react';

const Home = () => {
    const [globalStore, dispatch] = useGlobalStore();
    const checkLoggedIn = async () => {
        const loggedInReturn = await API.get('/loginstatus');
        console.log("checkLoggedIn -> loggedInReturn", loggedInReturn)
        if (loggedInReturn.loggedIn === true) {
            dispatch({ do: 'login', userId: loggedInReturn.db_id });
            getUserData()
        }
    };

    const getUserData = async () => {
        const userData = await API.getUserData();
        dispatch({ do: 'setUserData', ...userData });
    };

    useEffect(() => {
        checkLoggedIn();
    }, []);

    return (
        <div>
            <Jumbotron />
            <About />
            <LabelBottomNavigation />
        </div>
    );
};

export default Home;
