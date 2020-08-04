import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import API from '../../utils/API';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
    wishlist: {
        color: 'blue',
    },
    applied: {
        color: 'orange',
    },
    interview: {
        color: 'red',
    },
    offer: {
        color: 'green',
    },
    rejected: {
        color: 'black',
    },
    // right: {
    //     posit,
    // },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const DateChooser = (props) => {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="dateChooser"
                value={props.value}
                onChange={props.setDate}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>
    );
};

const ViewPost = (props) => {
    const classes = useStyles();
    console.log('props are ', props);
    const {
        company,
        title,
        postingType,
        salary,
        dateAdded,
        notes,
        postLink,
        location,
        applied,
        appliedDate,
        heardBack,
        heardBackDate,
        interviewState,
        interViewNote,
        companyContact,
        savedApiLink,
    } = props;

    const [postType, setPostType] = useState(postingType);

    const [styleClass, setStyleClass] = useState(
        [classes.wishlist, classes.applied, classes.interview, classes.offer, classes.rejected][
            ['wishlist', 'applied', 'interview', 'offer', 'rejected'].indexOf(postingType)
        ]
    );

    const [values, setValues] = useState({
        applied,
        appliedDate: appliedDate || new Date(),

        heardBack,
        heardBackDate: heardBackDate || new Date(),

        interviewState,
    });

    const handlePostTypeChange = (event) => {
        let newPostType = event.target.value;
        setPostType(newPostType);
        setStyleClass(
            [classes.wishlist, classes.applied, classes.interview, classes.offer, classes.rejected][
                ['wishlist', 'applied', 'interview', 'offer', 'rejected'].indexOf(newPostType)
            ]
        );
    };

    const handleTextChange = (property) => (event) => {
        setValues({ ...values, [property]: event.target.value });
    };

    const handleCheckChange = (property) => (event) => {
        setValues({ ...values, [property]: event.target.checked });
    };
    const handleSwitchChange = (property) => (event) => {
        setValues({ ...values, [property]: event.target.checked });
    };
    const handleDateChange = (property) => (date) => {
        setValues({ ...values, [property]: date });
    };

    // TODO add validation to URLs before they're added to the DB so that links work

    return (
        <Container maxWidth="xs">
            <Grid container direction="column">
                <Grid container direction="row" alignItems="flex-end">
                    <Grid item xs={6}>
                        <Typography className={styleClass} variant="h4">
                            {company}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl className={[classes.formControl, classes.right].join(' ')}>
                            {/* <InputLabel id="postTypeSelectLabel">Category</InputLabel> */}
                            <Select
                                labelId="postTypeSelectLabel"
                                id="postTypeSelect"
                                value={postType}
                                onChange={handlePostTypeChange}
                            >
                                <MenuItem value="wishlist">Wishlist</MenuItem>
                                <MenuItem value="applied">Applied</MenuItem>
                                <MenuItem value="interview">Interview</MenuItem>
                                <MenuItem value="offer">Offer</MenuItem>
                                <MenuItem value="rejected">Rejected</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                {/* <Typography className={[styleClass, classes.right].join(' ')} variant="subtitle1">
                    {postingType.toUpperCase()}
                </Typography> */}

                {/* <Typography className={styleClass} variant="h4">
                    {company}
                </Typography> */}
                <Typography className={styleClass} variant="h5">
                    {title}
                </Typography>
                {/* {postLink ? (
                    <a href={postLink} target="_blank">
                        Link to the post
                    </a>
                ) : (
                    ''
                )}
                {dateAdded ? <p>{new Date(dateAdded).toDateString()}</p> : ''}
                {salary ? salary : ''}
                {location ? location : ''} */}

                <Typography variant="h5">Submitted an application?</Typography>
                <Grid container alignItems="flex-end">
                    <Grid item xs={6}>
                        <Switch
                            checked={values.applied}
                            onChange={handleSwitchChange('applied')}
                            color="primary"
                            name="heardBack"
                            inputProps={{ 'aria-label': 'Heard back?' }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        {values.applied ? (
                            <DateChooser value={values.appliedDate} setDate={handleDateChange('appliedDate')} />
                        ) : (
                            ''
                        )}
                    </Grid>
                </Grid>
                <Typography variant="h5">Heard back?</Typography>
                <Grid container alignItems="flex-end">
                    <Grid item xs={6}>
                        <Switch
                            checked={values.heardBack}
                            onChange={handleSwitchChange('heardBack')}
                            color="primary"
                            name="heardBack"
                            inputProps={{ 'aria-label': 'Heard back?' }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        {values.heardBack ? (
                            <DateChooser value={values.heardBackDate} setDate={handleDateChange('heardBackDate')} />
                        ) : (
                            ''
                        )}
                    </Grid>
                </Grid>
                {values.heardBack ? (
                    <>
                        <Typography variant="h5">Had an interview?</Typography>
                        <Grid container alignItems="flex-end">
                            <Grid item xs={6}>
                                <FormControl component="fieldset">
                                    {/* <FormLabel component="legend">Interview State</FormLabel> */}
                                    <RadioGroup
                                        aria-label="gender"
                                        name="gender1"
                                        value={values.interviewState}
                                        onChange={handleTextChange('interviewState')}
                                    >
                                        <FormControlLabel
                                            value="No Interview"
                                            control={<Radio />}
                                            label="No Interview"
                                        />
                                        <FormControlLabel
                                            value="Phone Interview"
                                            control={<Radio />}
                                            label="Phone Interview"
                                        />
                                        <FormControlLabel
                                            value="Onsite Interview"
                                            control={<Radio />}
                                            label="Onsite Interview"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                {values.heardBack ? (
                                    <DateChooser
                                        value={values.heardBackDate}
                                        setDate={handleDateChange('heardBackDate')}
                                    />
                                ) : (
                                    ''
                                )}
                            </Grid>
                        </Grid>
                    </>
                ) : (
                    ''
                )}
                {/* <FormControlLabel
                    labelPlacement='start'
                    control={
                        
                    }
                    label="Heard back?"
                /> */}
            </Grid>
        </Container>
    );
};

export default ViewPost;
