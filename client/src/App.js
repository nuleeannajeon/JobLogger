import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
// import { purple, green } from '@material-ui/core/colors';

import { GlobalStore } from './components/GlobalStore';

import Registration from './pages/Registration';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Content from './pages/Content'; // temp for testing
import Message from './components/Message';
import Logout from './pages/Logout';
import UserSettings from './pages/UserSettings';
import Home from './pages/Home';
import './App.css';
import Navbar from './components/Navbar';
import PostAdd from './pages/PostAdd';
const NavbarWithRouter = withRouter(Navbar);


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#5F9EA0',
        },
        secondary: {
            main: '#605fa0',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStore>
                <Message />
                <Router>
                    <NavbarWithRouter />
                    <div>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/register" component={Registration} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/logout" component={Logout} />
                        <PrivateRoute exact path="/home">
                            <Content />
                        </PrivateRoute>
                        <PrivateRoute path="/settings">
                            <UserSettings />
                        </PrivateRoute>
                        <Route exact path="/newpost" component={PostAdd} />
                    </div>
                </Router>
            </GlobalStore>
        </ThemeProvider>
    );
}

export default App;
