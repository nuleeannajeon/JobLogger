import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import Registration from './pages/Registration'


function App() {
  return (
    <Router>
        <Route exact path={['/register', '/']} component={Registration} />
    </Router>
  );
}

export default App;
