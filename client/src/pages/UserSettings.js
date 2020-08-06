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
import PersonIcon from '@material-ui/icons/Person';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import API from '../utils/API';
import processServerReturn from '../utils/processServerReturn';
import SchoolIcon from '@material-ui/icons/School';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import WorkIcon from '@material-ui/icons/Work';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import ResponsiveSubmit from '../components/ResponsiveSubmit';
import Divider from '@material-ui/core/Divider';
import SaveIcon from '@material-ui/icons/Save';

import styles from './UserSettings.module.css';
const useStyles = makeStyles((theme) => ({
    inputField: {
        marginTop: theme.spacing(2),
    },
    submitButton: {
        // marginTop: theme.spacing(2),
        backgroundColor: theme.primary,
    },
    title: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    sectionDivider: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
    },
    inputContainer: {
        marginBottom: theme.spacing(4),
    },
    hero: {
        width: '100%',
        height: 300,
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroIcon: {
        fontSize: '3em',
    },
    personImage: {
        borderRadius: '25px',
        width: '150px'
        
    },
}));

const UserSettings = () => {
    const [globalStore, dispatch] = useGlobalStore();
    const history = useHistory();
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    let { path, url } = useRouteMatch();

    //FIELDS
    const defaultValues = {
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
    };

    const [values, setValues] = useState(defaultValues);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = (props) => () => {
        setValues({ ...values, ['show' + props]: !values['show' + props] });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        getUserData();
        //eslint-disable-next-line
    }, []);

    //FUNCTIONS
    const getUserData = async () => {
        const userData = await API.getUserData();
        dispatch({ do: 'setUserData', ...userData });
    };

    const clearFields = () => {
        setValues(defaultValues);
    };

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

        if (newPassword1.length < 8) {
            dispatch({
                do: 'setMessage',
                type: 'error',
                message: 'Your password must be 8 characters or greater.',
            });
            setTimeout(() => dispatch({ do: 'clearMessage' }), 2500);
            return
        }

        const serverReturn = await API.put('/api/user', { currentPassword, newPassword: newPassword1 });

        processServerReturn(serverReturn, dispatch);
        return !serverReturn.error;
    };

    const handlePasswordSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const success = submitPasswordChange();
        let timer = setTimeout(() => {
            setLoading(false);
            clearFields();
            clearTimeout(timer);
        }, 500);
    };

    const submitDetails = async () => {
        let changedData = {};
        ['school', 'location', 'portfolioLink', 'name'].forEach((field) => {
            if (values[field] !== '') changedData[field] = values[field];
        });

        const serverReturn = await API.put('/api/userdata', changedData);
        console.log('submitDetailChange -> serverReturn', serverReturn);
        processServerReturn(serverReturn, dispatch);
        await getUserData();
        return !serverReturn.error;
    };

    const handleSubmitDetails = async (event) => {
        event.preventDefault();
        setLoading(true);
        const success = await submitDetails();
        let timer = setTimeout(() => {
            setLoading(false);
            clearFields();
            clearTimeout(timer);
        }, 500);
    };

    return (
        <div>
            <div className={classes.hero}>
                <Typography variant="h2">
                    {globalStore.thumbnail ? (
                        <img className={classes.personImage} src={globalStore.thumbnail} alt="UserIcon" />
                    ) : (
                        <PersonIcon className={classes.heroIcon} />
                    )}
                </Typography>
            </div>
            <Container maxWidth="sm">
                <Typography className={classes.title} variant="h4">
                    My profile
                </Typography>
                <Grid
                    className={classes.inputContainer}
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="stretch"
                >
                    <TextField
                        className={classes.inputField}
                        placeholder={globalStore.name}
                        label="Name"
                        type="text"
                        value={values.name}
                        onChange={handleChange('name')}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <PersonIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="School"
                        // required
                        placeholder={globalStore.school}
                        className={classes.inputField}
                        type="text"
                        value={values.school}
                        onChange={handleChange('school')}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SchoolIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Location"
                        // required
                        placeholder={globalStore.location}
                        className={classes.inputField}
                        type="text"
                        value={values.location}
                        onChange={handleChange('location')}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <PersonPinIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Portfolio Link"
                        // required
                        placeholder={globalStore.portfolioLink}
                        className={classes.inputField}
                        type="text"
                        value={values.portfolioLink}
                        onChange={handleChange('portfolioLink')}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <WorkIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <ResponsiveSubmit
                    buttonClass={classes.submitButton}
                    name="Save Changes"
                    submit={handleSubmitDetails}
                    loading={loading}
                    icon={<SaveIcon />}
                />
                {! globalStore.linkedinUser && (
                <>
                <Divider variant="fullWidth" className={classes.sectionDivider} />
                <Typography className={classes.title} variant="h4">
                    Change my password
                </Typography>
                <Grid
                    className={classes.inputContainer}
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="stretch"
                >
                    <TextField
                        label="Current Password"
                        required
                        className={classes.inputField}
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
                        label="New Password"
                        required
                        className={classes.inputField}
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
                        label="New Password"
                        required
                        className={classes.inputField}
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
                <ResponsiveSubmit
                    buttonClass={classes.submitButton}
                    name="Save Password"
                    submit={handlePasswordSubmit}
                    loading={loading}
                    icon={<SaveIcon />}
                />
                </>
                )}
            </Container>
        </div>
    );
};

export default UserSettings;
