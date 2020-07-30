import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { useGlobalStore } from '../components/GlobalStore';

import API from '../utils/API';

import './registration.css';

const Registration = (props) => {
    const history = useHistory();
    const [, dispatch] = useGlobalStore();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        showPassword: false,
    });

    const submitRegistration = async () => {
        const userData = { name: values.name, email: values.email, password: values.password };
        const serverReturn = await API.post('/register', userData);
        console.log('submitRegistration -> serverReturn', serverReturn);

        if (!serverReturn || serverReturn.error) {
            dispatch({ do: 'setMessage', type: 'error', message: (serverReturn.error ? serverReturn.error : "Registration failure") });
            setTimeout(() => dispatch({ do: 'clearMessage' }), 2000);
            return // TODO add a case for checking if duplicate entry, prompt to login
        }

        dispatch({ do: 'setMessage', type: 'success', message: 'Registration Successful!' });
        setTimeout(() => dispatch({ do: 'clearMessage' }), 2000);

        setTimeout(() => history.push('/login'), 2000);
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
        <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column' }}>
            <FormControl>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input
                    id="name"
                    className="inp"
                    value={values.name}
                    onChange={handleChange('name')}
                    endAdornment={
                        <InputAdornment position="end">
                            <AccountCircle />
                        </InputAdornment>
                    }
                />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="email">email</InputLabel>
                <Input
                    id="email"
                    className="inp"
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
                    className="inp"
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

            <Button variant="contained" color="primary" onClick={submitRegistration}>
                Submit
            </Button>
        </Container>
    );
};

export default Registration;
