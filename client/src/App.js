import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import { GlobalStore } from './components/GlobalStore';

import './App.css';
import Registration from './pages/Registration';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Message from './components/Message';
import Logout from './pages/Logout';
import UserSettings from './pages/UserSettings';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Overview from './pages/Overview';
import MyJourney from './pages/MyJourney';
import UserEntry from './pages/Userentry';
import Reminders from './pages/Reminders';
import Search from './pages/Search';
import Footer from './components/Footer';
import NavbarMUI from './components/NavbarMUI'
import Contacts from './pages/Contacts'

const NavbarWithRouter = withRouter(Navbar);
const FooterWithRouter = withRouter(Footer)
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#5F9EA0',
        },
        secondary: {
            main: '#605fa0',
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 700,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    mainAppContainer: {
        minHeight: 'calc(100vh - 4em)',
        height: '100%',
        position: 'relative',
        paddingBottom: '4em',
    },
});

const useStyles = makeStyles((theme) => ({
    paddingTop: {
        marginTop: '4rem',
        [theme.breakpoints.down('sm')]: {
            marginTop: 40,
        }
    },
    
}));

function App() {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <GlobalStore>
                <Message />
                <Router>
                    <div className='main-app-container'>
                        {/* <NavbarWithRouter /> */}
                        <NavbarMUI />
                        <div className={classes.paddingTop}>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/entry" component={UserEntry} />
                            <Route exact path="/register" component={Registration} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/logout" component={Logout} />
                            <PrivateRoute path="/overview">
                                <Overview />
                            </PrivateRoute>
                            <PrivateRoute path="/search">
                                <Search />
                            </PrivateRoute>
                            <PrivateRoute path="/settings">
                                <UserSettings />
                            </PrivateRoute>
                            <PrivateRoute path="/contacts">
                                <Contacts />
                            </PrivateRoute>
                            <PrivateRoute exact path="/myjourney">
                                <MyJourney />
                            </PrivateRoute>
                            <PrivateRoute exact path="/reminders">
                                <Reminders />
                            </PrivateRoute>
                        </div>
                        <FooterWithRouter />
                    </div>
                </Router>
            </GlobalStore>
        </ThemeProvider>
    );
}

export default App;
