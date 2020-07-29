import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import { GlobalStore } from './components/GlobalStore';

import Registration from './pages/Registration';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Content'; // temp for testing
import Message from './components/Message'

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
    const [loggedIn, setLoggedIn] = useState(false);

    const login = () => {
        setLoggedIn(true);
    };

    return (
        <GlobalStore>
            <Message />
            <Router>
                <Route exact path={['/register', '/']} component={Registration} />
                <Route exact path="/login">
                    <Login login={login} />
                </Route>

                <PrivateRoute exact path="/home" loggedIn={loggedIn}>
                    <Home />
                </PrivateRoute>
            </Router>
        </GlobalStore>
    );
}

export default App;
