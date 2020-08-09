import React, { useState } from 'react';
// import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
// import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
// import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Switch from '@material-ui/core/Switch';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useGlobalStore } from '../GlobalStore';
import API from '../../utils/API';
import processServerReturn from '../../utils/processServerReturn';
import ResponsiveSubmit from '../ResponsiveSubmit';
import Input from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Slide from '@material-ui/core/Slide';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ReminderDialog from '../ReminderDialog';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const RedRadio = withStyles({
    root: {
      color: "red",
      '&$checked': {
        color: "red",
      },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const YellowRadio = withStyles({
    root: {
      color: "yellow",
      '&$checked': {
        color: "yellow",
      },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const GreenRadio = withStyles({
    root: {
      color: "green",
      '&$checked': {
        color: "green",
      },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const BlueRadio = withStyles({
    root: {
      color: "blue",
      '&$checked': {
        color: "blue",
      },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const PurpleRadio = withStyles({
    root: {
      color: "purple",
      '&$checked': {
        color: "purple",
      },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginBottom: theme.spacing(2),
        },
    },
    modal: {
        maxWidth: '100vw',
        [theme.breakpoints.down('sm')]: {
            '& .MuiDialog-paper': {
                margin: '10px',
            },
        },
    },
    responsiveWrapper: {
        display: 'inline-block',
    },
    changeWidth: {
        width: '90%',
        marginTop: theme.spacing(2),
    },
    addButton: {
        [theme.breakpoints.down('xs')]: {
            position: 'fixed',
            zIndex: 10,
            bottom: theme.spacing(8),
            right: theme.spacing(2),
        },
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
        green: {
            color: green[400],
            '&$checked': {
                color: green[600],
            },
        },
    },
}));

export default function SimpleModal(props) {
    const [, dispatch] = useGlobalStore();
    const [loading, setLoading] = useState(false);
    const [reminderDialogOpen, setReminderDialogOpen] = useState(false);

    const defaultValues = {
        color: '',
        company: '',
        companyLogoImage: '',
        postingType: '',
        title: '',
        location: '',
        salary: '',
        notes: '',
        postLink: '',
        appliedDate: Date.now(),
        heardBackDate: Date.now(),
        interviewState: null,
        interviewNote: '',
        companyContact: '',
    }


    const [values, setValues] = useState(defaultValues);

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    //eslint-disable-next-line
    const [scroll, setScroll] = useState('paper');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    // const handleCheckChange = (prop) => (event) => {
    //     setValues({...values, [prop]: event.target.checked})
    // }

    const handleDateChange = (prop) => (date) => {
        setValues({ ...values, [prop]: date });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const success = await submitChange();
        setTimeout(() => setLoading(false), 500);

        if (success) {
            setOpen(false);
            props.rerender();
            setValues(defaultValues);
        }
    };
    const handleReset = async (event) => {
        event.preventDefault();
        setValues(defaultValues);
    };

    const submitChange = async () => {
        let serverMessage = {...values};

        //Validate the fields are valid for the DB
        //company can't be empty
        if (serverMessage.company === '') {
            dispatch({ do: 'setMessage', type: 'error', message: 'The company name cannot be empty.' });
            setTimeout(() => dispatch({ do: 'clearMessage' }), 2000);
            return;
        }

        //title can't be empty
        if (serverMessage.title === '') {
            dispatch({ do: 'setMessage', type: 'error', message: 'The title cannot be empty.' });
            setTimeout(() => dispatch({ do: 'clearMessage' }), 2000);
            return;
        }

        if (serverMessage.postingType === '') {
            dispatch({ do: 'setMessage', type: 'error', message: 'Please choose your posting type.' });
            setTimeout(() => dispatch({ do: 'clearMessage' }), 2000);
            return;
        }

        //postLink has to be a valid URL
        const verifyURL = (url) => {
            //eslint-disable-next-line
            const re = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
            if (re.test(url)) {
                if (!url.includes('http://') && !url.includes('https://') && url.includes('www.')) {
                    return 'http://' + url;
                } else {
                    return url;
                }
            }
            return false;
        };
        if (serverMessage.postLink.trim() !== '') {
            const validurl = verifyURL(serverMessage.postLink.trim());
            if (validurl === false) {
                dispatch({ do: 'setMessage', type: 'error', message: 'Not a valid url.' });
                setTimeout(() => dispatch({ do: 'clearMessage' }), 2000);
                return;
            }
            serverMessage.postLink = validurl;
        }

        if (!['applied', 'interview', 'offer', 'reject'].includes(serverMessage.postingType)){
            delete serverMessage.appliedDate
        }

        if (! ['interview', 'offer', 'reject'].includes(serverMessage.postingType)){
            delete serverMessage.heardBackDate
        }
        //removing any empty fields from the put statement
        Object.keys(serverMessage).forEach((key) => {
            if (!serverMessage[key]) {
                delete serverMessage[key];
            }
        });

        const serverResponse = await API.post('/api/posts/', serverMessage);

        processServerReturn(serverResponse, dispatch);
        return !serverResponse.error;
    };

    //Reminder adding modal stuff
    const addReminder = (reminderDate) => {
        //when okay is clicked in reminder dialog, add to the values
        setValues({ ...values, reminder: reminderDate });
        setReminderDialogOpen(false);
    };

    const body = (
        <Grid container direction="column" className={classes.root}>
            <Grid container direction="row" justify="space-between">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    {/* <Grid container alignItems="flex-end"> */}
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date Added"
                            value={new Date()}
                            onChange={() => {
                                console.log('no');
                            }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    {/* </Grid> */}
                </MuiPickersUtilsProvider>
                <Tooltip title="Reminder">
                    <Button
                        onClick={() => {
                            setReminderDialogOpen(true);
                        }}
                    >
                        <NotificationsIcon />
                    </Button>
                </Tooltip>
            </Grid>
            <FormControl component="fieldset">
                <FormLabel component="legend">Box Color</FormLabel>
                <RadioGroup row aria-label="color" name="color" value={values.color} onChange={handleChange('color')}>
                    <FormControlLabel value="red" control={<RedRadio />} label="Red" labelPlacement="bottom" />
                    <FormControlLabel value="yellow" control={<YellowRadio />} label="Yellow" labelPlacement="bottom" />
                    <FormControlLabel value="green" control={<GreenRadio />} label="Green" labelPlacement="bottom" />
                    <FormControlLabel value="blue" control={<BlueRadio />} label="Blue" labelPlacement="bottom" />
                    <FormControlLabel value="purple" control={<PurpleRadio />} label="Purple" labelPlacement="bottom" />
                    <FormControlLabel value="none" control={<Radio />} label="None" labelPlacement="bottom" />
                </RadioGroup>
            </FormControl>

            <TextField
                id="company-text"
                label="Company"
                value={values.company}
                onChange={handleChange('company')}
            />

            <TextField id="title-text" label="Title" value={values.title} onChange={handleChange('title')} />

            <Grid container alignItems="flex-end">
                <Grid item md={4} xs={12}>
                    <FormControl style={{ width: '90%' }}>
                        <InputLabel htmlFor="PostingType">Posting Type</InputLabel>
                        <Select
                            native
                            value={values.postingType}
                            onChange={handleChange('postingType')}
                            inputProps={{
                                name: 'Post Type',
                                id: 'PostingType',
                            }}
                        >
                            <option value=""></option>
                            <option value="wishlists">Wishlists</option>
                            <option value="applied">Applied</option>
                            <option value="interview">Interview</option>
                            <option value="offer">Offer</option>
                            <option value="reject">Reject</option>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item md={4} xs={12}>
                    <TextField
                        id="location"
                        label="Location"
                        value={values.location}
                        onChange={handleChange('location')}
                        className={classes.changeWidth}
                    />
                </Grid>

                <Grid item md={4} xs={12}>
                    <FormControl className={classes.changeWidth}>
                        <InputLabel htmlFor="salasalary">Monthly Salary</InputLabel>
                        <Input
                            id="salary"
                            type="number"
                            value={values.salary}
                            onChange={handleChange('salary')}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    {(values.postingType === 'applied' ||
                        values.postingType === 'interview' ||
                        values.postingType === 'offer' ||
                        values.postingType === 'reject') && (
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                label="Applied Date"
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="dateChooser"
                                value={values.appliedDate}
                                onChange={handleDateChange('appliedDate')}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    )}
                </Grid>

                {values.postingType === 'interview' ||
                values.postingType === 'offer' ||
                values.postingType === 'reject' ? (
                    <Grid item xs={12} md={5}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                label="Interviewed Date"
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="dateChooser"
                                value={values.heardBackDate}
                                onChange={handleDateChange('heardBackDate')}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                ) : (
                    ''
                )}

                {values.postingType === 'interview' ||
                values.postingType === 'offer' ||
                values.postingType === 'reject' ? (
                    <Grid item xs={12} md={7}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Interview State</FormLabel>
                            <RadioGroup
                                row
                                aria-label="interviewState"
                                name="interviewState"
                                value={values.interviewState}
                                onChange={handleChange('interviewState')}
                            >
                                <FormControlLabel
                                    value="emailInterview"
                                    control={<Radio />}
                                    label="Email"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel
                                    value="phoneInterview"
                                    control={<Radio />}
                                    label="Phone"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel
                                    value="onsiteInterview"
                                    control={<Radio />}
                                    label="Onsite"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel value="" control={<Radio />} label="None" labelPlacement="bottom" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                ) : (
                    ''
                )}

                {values.postingType === 'interview' ||
                values.postingType === 'offer' ||
                values.postingType === 'reject' ? (
                    <Grid item xs={12}>
                        <TextField
                            className="interviewNote"
                            value={values.interviewNote}
                            onChange={handleChange('interviewNote')}
                            id="outlined-multiline-static"
                            multiline
                            label="Interview Notes"
                            rows={6}
                            variant="outlined"
                            style={{ width: '100%' }}
                        />
                    </Grid>
                ) : (
                    ''
                )}
            </Grid>

            <TextField id="postLink" label="Post Link" value={values.postLink} onChange={handleChange('postLink')} />

            <TextField
                id="companyLogoImage"
                label="Company Logo Image URL"
                value={values.companyLogoImage}
                onChange={handleChange('companyLogoImage')}
                helperText="Optional: Add Employer Logo image url"
            />

            <TextField
                onChange={handleChange('notes')}
                id="outlined-multiline-static"
                multiline
                label="Notes"
                rows={8}
                variant="outlined"
                value={values.notes}
            />
        </Grid>
    );

    return (
        <div>
            <button className="create-button" type="button" onClick={handleOpen}>
                Create New Post
            </button>
            <Fab color="primary" className={classes.addButton} aria-label="add post" onClick={handleOpen}>
                <AddIcon />
            </Fab>
            <ReminderDialog
                open={reminderDialogOpen}
                handleOk={addReminder}
                handleCancel={() => setReminderDialogOpen(false)}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                className={classes.modal}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                TransitionComponent={Transition}
            >
                <DialogTitle id="scroll-dialog-title">Post</DialogTitle>
                <DialogContent dividers={scroll === 'paper'} style={{ margin: '0' }}>
                    {body}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleReset}>Reset</Button>
                    <Button onClick={handleClose} color="secondary">
                        Close
                    </Button>
                    <ResponsiveSubmit
                        submit={handleSubmit}
                        loading={loading}
                        name="Save"
                        wrapperClass={classes.responsiveWrapper}
                        size="small"
                    />
                </DialogActions>
            </Dialog>
        </div>
    );
}
