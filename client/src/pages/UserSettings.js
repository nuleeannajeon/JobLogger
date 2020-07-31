import React, { useState, useEffect } from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
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

const UserSettings = () => {
    const [globalStore, dispatch] = useGlobalStore();
    const history = useHistory();
    let { path, url } = useRouteMatch();

    //FIELDS
    const [values, setValues] = useState({
        currentPassword: '',
        newPassword1: '',
        newPassword2: '',
        showcurrentPassword: false,
        shownewPassword1: false,
        shownewPassword2: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = (props) => () => {
        setValues({ ...values, ['show' + props]: !values['show' + props] });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    //FUNCTIONS
    const submitPasswordChange = async () => {
        const { currentPassword, newPassword1, newPassword2 } = values;
        //Check fields are filled
        if (currentPassword.length === 0 || newPassword1.length === 0 || newPassword2.length === 0) {
            dispatch({
                do: 'setMessage',
                type: 'error',
                message: 'Please fill all fields',
            });
            setTimeout(() => dispatch({ do: 'clearMessage' }), 2500);
            return;
        }

        //check new and new 2 password match
        if (!(newPassword1 === newPassword2)) {
            dispatch({
                do: 'setMessage',
                type: 'error',
                message: 'Your passwords do not match',
            });
            setTimeout(() => dispatch({ do: 'clearMessage' }), 2500);
            return;
        }

        const serverReturn = await API.put('/api/user', { currentPassword, newPassword: newPassword1 });
        console.log("submitPasswordChange -> serverReturn", serverReturn)

        if (! serverReturn){
            dispatch({
                do: 'setMessage',
                type: 'error',
                message: "The server is down",
            });
            setTimeout(() => dispatch({ do: 'clearMessage' }), 2500);
            return;
        }


        if (serverReturn.error) {
            dispatch({
                do: 'setMessage',
                type: 'error',
                message: serverReturn.error,
            });
            setTimeout(() => dispatch({ do: 'clearMessage' }), 2500);
            return;
        }

        if (serverReturn.message) {
            dispatch({
                do: 'setMessage',
                type: 'success',
                message: serverReturn.message,
            });
            setTimeout(() => dispatch({ do: 'clearMessage' }), 2500);
            return;
        }

        // send to server, display response (server needs to send back if the current password is right, and if it was updated)
    };

    return (
        <div>
            <Container>
                <Typography variant="h4">Settings</Typography>
                <Link to={`${url}/changepassword`}>Change Password</Link>
                <Switch>
                    <Route path={`${path}/changepassword`}>
                        <TextField
                            style={{ marginTop: 10 }}
                            label="Current Password"
                            required
                            className="inputField"
                            type={values.showcurrentPassword ? 'text' : 'password'}
                            value={values.currentPassword}
                            onChange={handleChange('currentPassword')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword('currentPassword')}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showcurrentPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            style={{ marginTop: 10 }}
                            label="New Password"
                            required
                            className="inputField"
                            type={values.shownewPassword1 ? 'text' : 'password'}
                            value={values.newPassword1}
                            onChange={handleChange('newPassword1')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword('newPassword1')}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.shownewPassword1 ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            style={{ marginTop: 10, marginBottom: 20 }}
                            label="New Password"
                            required
                            className="inputField"
                            type={values.shownewPassword2 ? 'text' : 'password'}
                            value={values.newPassword2}
                            onChange={handleChange('newPassword2')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword('newPassword2')}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.shownewPassword2 ? <Visibility /> : <VisibilityOff />}
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
                            onClick={submitPasswordChange}
                        >
                            Change Password
                        </Button>
                    </Route>
                </Switch>
            </Container>
        </div>
    );
};

export default UserSettings;
