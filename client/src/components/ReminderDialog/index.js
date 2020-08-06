import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const ReminderAddDialog = (props) => {
    const { open, handleOk, handleCancel } = props;

    const [date, setDate]  = useState(new Date())

    const handleChange = (date) => {
        setDate(date)
    }

    const handleSubmit = () => {
        handleOk(date)
    }

    return (
        <Dialog maxWidth="xs" aria-labelledby="reminder-add-dialog-title" open={open}>
            <DialogTitle id="reminder-add-dialog-title">Add a Reminder</DialogTitle>
            <DialogContent dividers>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date Added"
                        value={date}
                        onChange={handleChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => {handleOk('')}}>
                    Delete Reminder
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReminderAddDialog;
