import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { useGlobalStore } from '../components/GlobalStore';
import JobLoggerIcon from '../components/JobLoggerIcon';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import API from '../utils/API';
import processServerReturn from '../utils/processServerReturn';
import './registration.css';

function validateEmail(email) {
    //eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const Registration = (props) => {
    const history = useHistory();
    const [globalStore, dispatch] = useGlobalStore();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        showPassword: false,
        errorPassword: false,
        errorEmail: false,
        errorName: false,
    });

    const checkLoggedIn = async () => {
        const loggedInReturn = await API.get('/loginstatus');
        if (loggedInReturn.loggedIn === true) {
            dispatch({ do: 'login', userId: loggedInReturn.db_id });
            history.push('/home');
        }
    };

    useEffect(() => {
        if (globalStore.loggedIn) {
            history.push('/home');
        } else if (localStorage.session) {
            checkLoggedIn();
        }

        // eslint-disable-next-line
    }, []);

    const submitRegistration =  async (event) => {
        event.preventDefault();
        const userData = { name: values.name, email: values.email, password: values.password };

        //validating
        let message;
        setValues({
            ...values,
            errorPassword: (values.password.trim().length < 8),
            errorName: values.name.trim().length === 0,
            errorEmail: values.name.trim().length === 0,
        });

        // This ifs unfortunately can't check errorEmail etc because in this iteration they haven't changed yet.
        if (values.password.trim().length < 8) {
            message = 'Please enter a password of at least 8 characters';
        }
        if (values.name.trim().length === 0) {
            message = 'Please enter a valid email address';
        }
        if (values.name.trim().length === 0) {
            message = 'Please enter a name';
        }
        if (message) {
            dispatch({ do: 'setMessage', type: 'error', message });
            setTimeout(() => dispatch({ do: 'clearMessage' }), 2000);
            return;
        }

        const serverReturn = await API.post('/register', userData);
        // console.log('submitRegistration -> serverReturn', serverReturn);

        processServerReturn(serverReturn, dispatch);

        if (! serverReturn.error) setTimeout(() => history.push('/login'), 2000);
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = (event) => {
        event.preventDefault();
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
                    Register
                </Typography>
                <Grid
                    style={{ maxWidth: 500 }}
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="stretch"
                >
                    {/* <InputLabel htmlFor="name">Name</InputLabel> */}
                    <form noValidate={false} autoComplete="on">
                        <TextField
                            style={{ marginTop: 10 }}
                            id="name"
                            label="Name"
                            required
                            error={values.errorName}
                            className="inputField"
                            value={values.name}
                            onChange={handleChange('name')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            style={{ marginTop: 10 }}
                            id="email"
                            label="Email Address"
                            required
                            error={values.errorEmail}
                            className="inputField"
                            type={values.email}
                            value={values.email}
                            onChange={handleChange('email')}
                            // endAdornment={<InputAdornment position="end"></InputAdornment>}
                        />
                        <TextField
                            style={{ marginTop: 10, marginBottom: 15 }}
                            id="password"
                            label="Password"
                            autoComplete="current-password"
                            required
                            error={values.errorPassword}
                            helperText="Password must be at least 8 characters"
                            minLength={6}
                            className="inputField"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            variant="contained"
                            className="spaceMe"
                            color="primary"
                            style={{ marginBottom: '1em', width: '100%' }}
                            onClick={submitRegistration}
                        >
                            Submit
                        </Button>
                    </form>
                    <Button className="spaceMe" onClick={() => history.push('/login')}>
                        I'm already registered
                    </Button>
                </Grid>
            </Container>
        </div>
    );
};

export default Registration;
