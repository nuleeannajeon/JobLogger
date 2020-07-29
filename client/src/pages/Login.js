import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import './login.css'
import API from '../utils/API'


const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
    });

    const submitLogin = () => {
        
    }

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
                <InputLabel htmlFor="email">email</InputLabel>
                <Input
                    id="email"
                    className="inp"
                    type={values.email}
                    value={values.email}
                    onChange={handleChange('email')}
                    endAdornment={<InputAdornment position="end"></InputAdornment>}
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

            <Button variant="contained" color="primary" onClick={submitLogin}>
                Login
            </Button>
        </Container>
    );
}

export default Login;
