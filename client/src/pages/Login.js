import React, { useState, useEffect } from 'react';
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

const saveSession = (sessionID) => {
    localStorage.session = JSON.stringify(sessionID);
};

const Login = () => {
    const history = useHistory();
    const [globalStore, dispatch] = useGlobalStore();
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
    });

    useEffect(() => {
        if (globalStore.loggedIn) {
            history.push('/home');
        }
        // eslint-disable-next-line
    }, []);

    const oAuthloginComplete = (returnedData) => {
        if (!returnedData || returnedData.error) {
            dispatch({
                do: 'setMessage',
                type: 'error',
                message: returnedData.error ? returnedData.error : "The server didn't communicate back",
            });
            setTimeout(() => dispatch({ do: 'clearMessage' }), 2000);
            return;
        }

        localStorage.session = JSON.stringify(returnedData.session);
        dispatch({ do: 'setMessage', type: 'success', message: returnedData.message });
        dispatch({ do: 'login' });
        setTimeout(() => dispatch({ do: 'clearMessage' }), 2000);
        setTimeout(() => history.push('/home'), 2000);
    };

    const submitLogin = async () => {
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

        if (serverReturn.error || !serverReturn || !serverReturn.session) {
            dispatch({
                do: 'setMessage',
                type: 'error',
                message: serverReturn.error ? serverReturn.error : "The server didn't communicate back",
            });
            setTimeout(() => dispatch({ do: 'clearMessage' }), 2000);
            return;
        }
        if (serverReturn.message) {
            dispatch({ do: 'setMessage', type: 'success', message: serverReturn.message });
            setTimeout(() => dispatch({ do: 'clearMessage' }), 2000);
        }

        saveSession(serverReturn.session);

        dispatch({ do: 'login' });
        setTimeout(() => dispatch({ do: 'clearMessage' }), 2000);
        setTimeout(() => history.push('/home'), 2000);
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
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
                    style={{ maxWidth: 500 }}
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="stretch"
                >
                    {/* <div className="formContainer"> */}
                    <FormControl>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input
                            id="email"
                            className="spaceMe inputField"
                            type={values.email}
                            value={values.email}
                            onChange={handleChange('email')}
                            // endAdornment={<InputAdornment position="end"></InputAdornment>}
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            id="password"
                            className="spaceMe inputField"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
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
                    <div className="buttonContainer">
                        <Button
                            variant="contained"
                            style={{ marginBottom: '1em' }}
                            color="primary"
                            className="spaceMe"
                            onClick={submitLogin}
                        >
                            Login
                        </Button>
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
