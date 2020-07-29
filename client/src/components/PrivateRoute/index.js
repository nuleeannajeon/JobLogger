///This function is a wrapper, to make sure the user is verified

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const checkAuth = () => {};

const PrivateRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={() => (checkAuth.isAuthenticated ? children : <Redirect to={{ pathname: '/login' }} />)}
        />
    );
};

export default PrivateRoute;
