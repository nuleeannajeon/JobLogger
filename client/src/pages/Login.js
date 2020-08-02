import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import './login.css';
import API from '../utils/API';
import { useGlobalStore } from '../components/GlobalStore';
import LinkedInOAuthButton from '../components/LinkedInOAuth/index.js';
import JobLoggerIcon from '../components/JobLoggerIcon';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import processServerReturn from '../utils/processServerReturn';
import ResponsiveSubmit from '../components/ResponsiveSubmit';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    loginButton: {
        margin: theme.spacing(1),
        backgroundColor: blue[500],
        '&:hover': {
            backgroundColor: blue[700],
        },
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
            marginTop: theme.spacing(1),
        },
    },
    inputContainer: {
        maxWidth: 500,
        '& > *' : {
            marginTop: theme.spacing(2)
        }
    }
}));

const saveSession = (sessionID) => {
    localStorage.session = sessionID;
};

const Login = () => {
    const history = useHistory();
    const [loading, setLoading] = React.useState(false);
    const [globalStore, dispatch] = useGlobalStore();
    const classes = useStyles();
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
    });
    const passwordRef = useRef(null);

    const checkLoggedIn = async () => {
        const loggedInReturn = await API.get('/loginstatus');
        if (loggedInReturn.loggedIn === true) {
            dispatch({ do: 'login', userId: loggedInReturn.db_id });
            history.push('/home');
        }
    };

    // checking if already logged in
    useEffect(() => {
        if (globalStore.loggedIn) {
            history.push('/home');
        } else if (localStorage.session) {
            checkLoggedIn();
        }

        // eslint-disable-next-line
    }, []);

    const oAuthloginComplete = (returnedData) => {
        processServerReturn(returnedData, dispatch);

        localStorage.session = JSON.stringify(returnedData.session);
        dispatch({ do: 'setMessage', type: 'success', message: returnedData.message });
        dispatch({ do: 'login', userId: returnedData.db_id });
        setTimeout(() => dispatch({ do: 'clearMessage' }), 2000);
        setTimeout(() => history.push('/home'), 2000);
    };

    const sendLogin = async () => {
        const userData = { email: values.email, password: values.password };

        if (values.email.trim().length === 0) {
            dispatch({ do: 'setMessage', type: 'error', message: 'Please enter an email address' });
            setTimeout(() => dispatch({ do: 'clearMessage' }), 2000);
            return;
        }

        if (values.password.trim().length === 0) {
            dispatch({ do: 'setMessage', type: 'error', message: 'Please enter a password' });
            setTimeout(() => dispatch({ do: 'clearMessage' }), 2000);
            return;
        }

        const serverReturn = await API.post('/login', userData);

        processServerReturn(serverReturn, dispatch);

        if (!serverReturn.session) {
            dispatch({
                do: 'setMessage',
                type: 'error',
                message: serverReturn.error ? serverReturn.error : "The server didn't create a session",
            });
            setTimeout(() => dispatch({ do: 'clearMessage' }), 2000);
            return;
        }
        saveSession(serverReturn.session);
        return true;
    };

    const submitLogin = async () => {
        setLoading(true);

        const success = await sendLogin();
        const timer = setTimeout(() => {
            setLoading(false);
            clearTimeout(timer);
        }, 500);
        if (success) {
            dispatch({ do: 'login' });
            setTimeout(() => history.push('/home'), 2000);
        }
    };

    const handleChange = (prop) => (event) => {
        const permEvent = event;
        if (permEvent.key === 'Enter' && prop === 'password') {
            submitLogin();
            return;
        }
        if (permEvent.key === 'Enter' && prop === 'email') {
            passwordRef.focus();
            return;
        }
        setValues({ ...values, [prop]: permEvent.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <div className="container">
            <Container maxWidth="sm">
                <JobLoggerIcon className="centerMe" />
                <Typography variant="h4" style={{ textAlign: 'center', marginTop: 40 }} gutterBottom>
                    Sign In
                </Typography>
                <Grid
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="stretch"
                    className={classes.inputContainer}
                >
                    {/* <div className="formContainer"> */}
                    <FormControl>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input
                            id="email"
                            // className="spaceMe inputField"
                            type={values.email}
                            value={values.email}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') passwordRef.current.children[0].focus();
                            }}
                            onChange={handleChange('email')}
                            // endAdornment={<InputAdornment position="end"></InputAdornment>}
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            id="password"
                            ref={passwordRef}
                            // className="spaceMe inputField"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') submitLogin();
                            }}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <div className={classes.buttonContainer}>
                        <ResponsiveSubmit
                            name="Login"
                            loading={loading}
                            buttonClass={classes.loginButton}
                            submit={submitLogin}
                        />
                        {/* <Button
                            variant="contained"
                            style={{ marginBottom: '1em' }}
                            color="primary"
                            className="spaceMe"
                            onClick={submitLogin}
                            disabled={loading}
                        >
                            Login
                        </Button> */}
                        <Button className="spaceMe" onClick={() => history.push('/register')}>
                            Register
                        </Button>
                        <LinkedInOAuthButton className="spaceMe" loginComplete={oAuthloginComplete} />
                    </div>
                    {/* </div> */}
                </Grid>
            </Container>
        </div>
    );
};

export default Login;
