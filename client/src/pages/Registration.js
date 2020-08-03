import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { useGlobalStore } from '../components/GlobalStore';
import JobLoggerIcon from '../components/JobLoggerIcon';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import API from '../utils/API';
import processServerReturn from '../utils/processServerReturn';
import ResponsiveSubmit from '../components/ResponsiveSubmit';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';

const useStyles = makeStyles((theme) => ({
    saveButton: {
        // margin: theme.spacing(1),
        // backgroundColor: theme.palette.primary,
        // '&:hover': {
        //     backgroundColor: blue[700],
        // },
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    centerMe: {
        display: 'block',
        margin: '0 auto',
    },
    title: { textAlign: 'center', marginTop: 20, marginBottom: 40 },
    spaceMe: { marginTop: 20 },
    input: {
        marginTop: theme.spacing(2),
    },
    bottomSpace: { marginBottom: theme.spacing(2) },
    responsiveButtonWrapper: {
        position: 'relative',
        display: 'inline-block',
        marginTop: 10,
        marginLeft: 10,
    },
}));

function validateEmail(email) {
    //eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const getSteps = () => ['Create your login credentials', 'Add some optional personal information'];

const Registration = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [globalStore, dispatch] = useGlobalStore();
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return {
                    title: 'Step 1',
                    content: (
                        <Grid
                            // style={{ maxWidth: 500 }}
                            container
                            direction="column"
                            justify="space-between"
                            alignItems="stretch"
                        >
                            {/* <InputLabel htmlFor="name">Name</InputLabel> */}
                            <form noValidate={false} autoComplete="on">
                                <TextField
                                    id="name"
                                    label="Name"
                                    required
                                    fullWidth
                                    error={values.errorName}
                                    className={classes.input}
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
                                    id="email"
                                    label="Email Address"
                                    required
                                    fullWidth
                                    error={values.errorEmail}
                                    className={classes.input}
                                    type={values.email}
                                    value={values.email}
                                    onChange={handleChange('email')}
                                    // endAdornment={<InputAdornment position="end"></InputAdornment>}
                                />
                                <TextField
                                    className={classes.input}
                                    id="password"
                                    label="Password"
                                    fullWidth
                                    autoComplete="current-password"
                                    required
                                    error={values.errorPassword}
                                    helperText="Password must be at least 8 characters"
                                    minLength={6}
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
                            </form>
                        </Grid>
                    ),
                };
            case 1:
                return {
                    title: 'Step 2',
                    content: (
                        <Grid
                            // style={{ maxWidth: 500 }}
                            container
                            direction="column"
                            // justify="space-between"
                            alignItems="stretch"
                        >
                            <form noValidate={false} autoComplete="on">
                                <TextField
                                    label="Location"
                                    fullWidth
                                    // error={values.errorName}
                                    className={classes.input}
                                    value={values.location}
                                    onChange={handleChange('location')}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <PersonPinIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    label="Your school"
                                    fullWidth
                                    // error={values.errorName}
                                    className={classes.input}
                                    value={values.school}
                                    onChange={handleChange('school')}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <SchoolIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    label="Portfolio Link"
                                    fullWidth
                                    // error={values.errorName}
                                    className={[classes.input, classes.bottomSpace].join(' ')}
                                    value={values.portfolioLink}
                                    onChange={handleChange('portfolioLink')}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <WorkIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </form>
                        </Grid>
                    ),
                };
            default:
                return {
                    title: 'Error',
                };
        }
    };

    const [loading, setLoading] = React.useState(false);
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        showPassword: false,
        errorPassword: false,
        errorEmail: false,
        errorName: false,
        errorLocation: false,
        location: '',
        school: '',
        portfolioLink: '',
    });

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleReset = () => {
        setActiveStep(0);
    };

    const checkLoggedIn = async () => {
        const loggedInReturn = await API.get('/loginstatus');
        if (loggedInReturn.loggedIn === true) {
            dispatch({ do: 'login', userId: loggedInReturn.db_id });
            history.push('/overview');
        }
    };

    useEffect(() => {
        if (globalStore.loggedIn) {
            history.push('/overview');
        } else if (localStorage.session) {
            checkLoggedIn();
        }

        // eslint-disable-next-line
    }, []);

    const sendRegistrationToServer = async () => {
        const userData = {
            name: values.name,
            email: values.email,
            password: values.password,
            location: values.location,
            school: values.school,
            portfolioLink: values.portfolioLink,
        };

        //validating
        let message;
        setValues({
            ...values,
            errorPassword: values.password.trim().length < 8,
            errorName: values.name.trim().length === 0,
            errorEmail: values.email.trim().length === 0 || !validateEmail(values.email),
        });

        // This ifs unfortunately can't check errorEmail etc because in this iteration they haven't changed yet.
        if (values.password.trim().length < 8) {
            message = 'Please enter a password of at least 8 characters';
        }
        if (values.email.trim().length === 0 || !validateEmail(values.email)) {
            message = 'Please enter a valid email address';
        }
        if (values.name.trim().length === 0) {
            message = 'Please enter a name';
        }
        if (message) {
            setActiveStep(0);
            dispatch({ do: 'setMessage', type: 'error', message });
            setTimeout(() => dispatch({ do: 'clearMessage' }), 2000);
            return;
        }

        const serverReturn = await API.post('/register', userData);
        // console.log('submitRegistration -> serverReturn', serverReturn);

        processServerReturn(serverReturn, dispatch);
        return !serverReturn.error;
    };

    const submitRegistration = async (event) => {
        event.preventDefault();
        setLoading(true);
        const success = await sendRegistrationToServer();
        let timer = setTimeout(() => {
            setLoading(false);
            clearTimeout(timer);
        }, 500);
        if (success) setTimeout(() => history.push('/login'), 2000);
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
        <div className={classes.container}>
            <Container maxWidth="sm">
                <JobLoggerIcon className={classes.centerMe} />
                <Typography variant="h4" className={classes.title} gutterBottom>
                    Register
                </Typography>
                <Button className={classes.spaceMe} onClick={() => history.push('/login')}>
                    I'm already registered
                </Button>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                            <StepContent>
                                <div>{getStepContent(index).content}</div>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        // className={classes.button}
                                    >
                                        Back
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        // className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <>
                        <Typography>You're ready to start logging those jobs!</Typography>
                        <div className={classes.finalButtonContainer}>
                            <Button onClick={handleReset} className={classes.button}>
                                Reset
                            </Button>
                            <ResponsiveSubmit
                                buttonClass={classes.saveButton}
                                submit={submitRegistration}
                                loading={loading}
                                size="normal"
                                colour="secondary"
                                wrapperClass={classes.responsiveButtonWrapper}
                                name="Submit"
                            />
                        </div>
                    </>
                )}
            </Container>
        </div>
    );
};

export default Registration;
