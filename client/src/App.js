import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { withRouter } from 'react-router';

import { GlobalStore } from './components/GlobalStore';

import Registration from './pages/Registration';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Content'; // temp for testing
import Message from './components/Message';
import Logout from './pages/Logout'

// const checkLoggedState = async () => {
//   if (!localStorage.session) {
//       return false;
//   }
//   const sessionID = JSON.parse(localStorage.session);
//   const serverReturn = await API.get('/loginstatus/' + String(sessionID));
//   console.log(serverReturn);
//   if (!serverReturn || serverReturn.error) {
//       return false;
//   }
//   return true;

// };

function App() {
    return (
        <GlobalStore>
            <Message />
            <Router>
                <Route exact path={['/register', '/']} component={Registration} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />
                <PrivateRoute exact path="/home">
                    <Home />
                </PrivateRoute>
            </Router>
        </GlobalStore>
    );
}

export default App;
