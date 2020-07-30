import React, { useState } from 'react';
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

import './registration.css';

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const Registration = (props) => {
    const history = useHistory();
    const [, dispatch] = useGlobalStore();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        showPassword: false,
    });
    const [validCheck, setValidCheck] = useState({ name: false, email: null, password: null });

    const submitRegistration = async () => {
        const userData = { name: values.name, email: values.email, password: values.password };

        //validating
        if (values.name.trim().length === 0) {
            dispatch({ do: 'setMessage', type: 'error', message: 'Please enter a name' });
            setTimeout(() => dispatch({ do: 'clearMessage' }), 2000);
            return;
        }
        if (values.email.trim().length === 0) {
            dispatch({ do: 'setMessage', type: 'error', message: 'Please enter an email address' });
            setTimeout(() => dispatch({ do: 'clearMessage' }), 2000);
            return;
        }
        if (! validateEmail(values.email.trim())) {
            dispatch({ do: 'setMessage', type: 'error', message: 'Please enter a valid email' });
            setTimeout(() => dispatch({ do: 'clearMessage' }), 2000);
            return;
        }
        if (values.password.trim().length === 0) {
            dispatch({ do: 'setMessage', type: 'error', message: 'Please enter a password' });
            setTimeout(() => dispatch({ do: 'clearMessage' }), 2000);
            return;
        }
        
        const serverReturn = await API.post('/register', userData);
        console.log('submitRegistration -> serverReturn', serverReturn);

        if (!serverReturn || serverReturn.error) {
            dispatch({
                do: 'setMessage',
                type: 'error',
                message: serverReturn.error ? serverReturn.error : 'Registration failure',
            });
            setTimeout(() => dispatch({ do: 'clearMessage' }), 2000);
            return; // TODO add a case for checking if duplicate entry, prompt to login
        }

        dispatch({ do: 'setMessage', type: 'success', message: serverReturn.message });
        setTimeout(() => dispatch({ do: 'clearMessage' }), 2000);

        setTimeout(() => history.push('/login'), 2000);
    };

    const handleChange = (prop) => (event) => {
        setValidCheck({ ...validCheck, [prop]: false });
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
                    <TextField
                        style={{ marginTop: 10 }}
                        id="name"
                        label="Name"
                        required
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
                        required
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
                        style={{ marginBottom: '1em' }}
                        onClick={submitRegistration}
                    >
                        Submit
                    </Button>
                    <Button className="spaceMe" onClick={() => history.push('/login')}>
                        I'm already registered
                    </Button>
                </Grid>
            </Container>
        </div>
    );
};

export default Registration;
