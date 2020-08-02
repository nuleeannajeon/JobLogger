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
import processServerReturn from '../utils/processServerReturn';
import Input from '../components/Input';
import './registration.css';
import SchoolIcon from '@material-ui/icons/School';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import WorkIcon from '@material-ui/icons/Work';

import styles from './UserSettings.module.css';

const spaceMe = { marginTop: 15 };

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
        name: '',
        email: '',
        school: '',
        portfolioLink: '',
        location: '',
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

        processServerReturn(serverReturn, dispatch);
    };

    const submitDetailChange = async () => {
        let changedData = {};
        ['school', 'location', 'portfolioLink'].forEach((field) => {
            if (values[field] !== '') changedData[field] = values[field];
        });

        const serverReturn = await API.put('/api/userdata', changedData);
        console.log("submitDetailChange -> serverReturn", serverReturn)
        processServerReturn(serverReturn, dispatch);
    };

    const submitNameChange = async () => {
        const { name } = values;

        if (!name || name.length === 0) {
            dispatch({
                do: 'setMessage',
                type: 'error',
                message: 'Please enter a new name',
            });
            setTimeout(() => dispatch({ do: 'clearMessage' }), 2500);
            return;
        }

        const serverReturn = await API.put('/api/user', { name });
        console.log("submitNameChange -> serverReturn", serverReturn)
        processServerReturn(serverReturn, dispatch);
    };

    return (
        <div>
            <Container maxWidth="sm">
                <Typography variant="h4">Settings</Typography>
                <Grid container direction="column" justify="space-between" alignItems="stretch">
                    <Input
                        value={values.school}
                        onChange={handleChange('school')}
                        style={spaceMe}
                        label="School"
                        className={styles.marginTop}
                        icon={<SchoolIcon />}
                    />
                    <Input
                        value={values.location}
                        onChange={handleChange('location')}
                        style={spaceMe}
                        label="Location"
                        icon={<PersonPinIcon />}
                        className={styles.marginTop}
                    />
                    <Input
                        value={values.portfolioLink}
                        onChange={handleChange('portfolioLink')}
                        style={spaceMe}
                        label="Portfolio Link"
                        icon={<WorkIcon />}
                        className={styles.marginTop}
                    />
                </Grid>
                <Button style={spaceMe} variant="contained" color="primary" onClick={submitDetailChange}>
                    Update
                </Button>
                <div className={styles.container}>
                    <Link to={`${url}/changename`}>Change Name</Link>
                    <br />
                    <Link to={`${url}/changepassword`}>Change Password</Link>
                </div>
                <Switch>
                    <Route path={`${path}/changepassword`}>
                        <Grid container direction="column" justify="space-between" alignItems="stretch">
                            <TextField
                                style={spaceMe}
                                label="Current Password"
                                required
                                className={styles.marginTop}
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
                                // style={{ marginTop: 10 }}
                                label="New Password"
                                required
                                style={spaceMe}
                                className={styles.marginTop}
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
                                // style={{ marginTop: 10, marginBottom: 20 }}
                                label="New Password"
                                required
                                style={spaceMe}
                                className={styles.marginTop}
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
                        </Grid>
                        <Button
                            style={spaceMe}
                            variant="contained"
                            color="primary"
                            className={styles.marginTop}
                            onClick={submitPasswordChange}
                        >
                            Change Password
                        </Button>
                    </Route>
                    <Route path={`${path}/changename`}>
                        <Grid container direction="column" justify="space-between" alignItems="stretch">
                            <TextField
                                style={spaceMe}
                                label="Update your name"
                                type="text"
                                value={values.name}
                                onChange={handleChange('name')}
                            />
                        </Grid>
                        <Button
                            style={spaceMe}
                            variant="contained"
                            className={styles.marginTop}
                            color="primary"
                            onClick={submitNameChange}
                        >
                            Update your name
                        </Button>
                    </Route>
                </Switch>
            </Container>
        </div>
    );
};

export default UserSettings;
