import React, { useEffect } from 'react';
import API from '../utils/API';
import { useGlobalStore } from '../components/GlobalStore';

const Logout = (props) => {
    const [, dispatch] = useGlobalStore();

    const logoutUser = async () => {
        console.log('Logging out');
        sessionStorage.clear();
        localStorage.clear();
        const serverReturn = await API.post('/logout', {});
        console.log('logoutUser -> serverReturn', serverReturn);
        dispatch({ do: 'logout' });
    };

    useEffect(() => {
        logoutUser();
        //eslint-disable-next-line
    }, []);

    return <div style={{ textAlign: 'center', width: '100%' }}>Logging out.</div>;
};

export default Logout;
