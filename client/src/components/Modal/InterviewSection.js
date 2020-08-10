import React, { useState } from 'react';
import { Grid, Divider, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useGlobalStore } from '../GlobalStore';
import { FormLabel, RadioGroup, Radio, FormControlLabel, FormControl } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme) => ({}));

const InterviewSection = (props) => {
    const { values, setValues } = props;
    const emptyInterview = {
        interviewDate: new Date(),
        interviewType: 'phone',
        interviewNotes: '',
    };
    const [interviewVals, setInterviewVals] = useState(emptyInterview);
    const [showNew, setShowNew] = useState(false);
    const classes = useStyles();

    const handleSave = () => {};

    const handleDateChange = (prop) => (date) => {
        setInterviewVals({ ...values, [prop]: date });
    };

    const handleChange = (prop) => (event) => {
        setInterviewVals({ ...values, [prop]: event.target.value });
    };

    return (
        <Grid container>
            <Divider />
            {showNew && (
                <>
                    <Grid item xs={12} md={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                label="Interview Date"
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="interviewDateChooser"
                                value={interviewVals.interviewDate}
                                onChange={handleDateChange('interviewDate')}
                                KeyboardButtonProps={{
                                    'aria-label': 'add interview date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl component="interviewTypeSelection">
                            <FormLabel component="legend">Interview Type</FormLabel>
                            <RadioGroup
                                row
                                aria-label="interviewState"
                                name="interviewType"
                                value={interviewVals.interviewType}
                                onChange={handleChange('interviewType')}
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
                                <FormControlLabel
                                    value="other"
                                    control={<Radio />}
                                    label="Other"
                                    labelPlacement="bottom"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className="interviewNote"
                            value={interviewVals.interviewNotes}
                            onChange={handleChange('interviewNotes')}
                            id="interviewNote"
                            multiline
                            label="Interview Notes"
                            rows={6}
                            variant="outlined"
                            style={{ width: '100%' }}
                        />
                    </Grid>

                    <Divider />
                    <Grid container direction="row" justify="center" alignItems="center">
                <Button
                    className={classes.addButton}
                    onClick={() => {
                        setShowNew(!showNew);
                    }}
                >
                    Save
                </Button>
            </Grid>
                    <Divider />
                </>
            )}
            <Grid container direction="row" justify="center" alignItems="center">
                <Button
                    className={classes.addButton}
                    onClick={() => {
                        setShowNew(!showNew);
                    }}
                >
                    Add an interview
                </Button>
            </Grid>
        </Grid>
    );
};

export default InterviewSection;
