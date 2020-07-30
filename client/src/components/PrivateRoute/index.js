///This function is a wrapper, to make sure the user is verified
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useGlobalStore } from '../GlobalStore';

const PrivateRoute = ({ children, loggedIn, ...rest }) => {
    const [globalState] = useGlobalStore();

    return <Route {...rest} render={() => (globalState.loggedIn ? children : <Redirect to={{ pathname: '/login' }} />)} />;
};

export default PrivateRoute;
