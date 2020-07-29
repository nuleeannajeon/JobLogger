///This function is a wrapper, to make sure the user is verified
import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import API from '../../utils/API';

const PrivateRoute = ({ children, loggedIn, ...rest }) => {
    return <Route {...rest} render={() => (loggedIn ? children : <Redirect to={{ pathname: '/login' }} />)} />;
};

export default PrivateRoute;
