import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import Registration from './pages/Registration'
import Login from './pages/Login'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Content' // temp for testing

function App() {
  return (
    <Router>
        <Route exact path='/register' component={Registration} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute>
            <Home />
        </PrivateRoute>
    </Router>
  );
}

export default App;
