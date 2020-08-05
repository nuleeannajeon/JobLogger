import React, { useState, useEffect } from 'react';
import { useGlobalStore } from '../GlobalStore';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import API from '../../utils/API';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
    reminder: {
        // position: 'fixed',
        // bottom: 10,
        // left: 10,
        zIndex: 10000,
    },
}));

const ReminderMessage = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(null);
    const history = useHistory();
    // const [globalData] = useGlobalStore();

    const checkForMessages = async () => {
        const reminders = await API.get('/api/reminders');

        if (!reminders) {
            return;
        }

        const reminderNames = reminders.map((reminder) => `${reminder.company} - ${reminder.title}`);
        setMessage(`You have reminders: ${reminderNames.join(', ')}`);
        setOpen(true);
    };

    useEffect(() => {
        checkForMessages();
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Snackbar open={open} onClose={handleClose}>
            <Alert className="reminderMessage" elevation={6} variant="filled" severity="info">
                {message}
                <br />
                <Button
                    color="secondary"
                    size="small"
                    onClick={() => {
                        setOpen(false);
                        history.push('/reminders');
                    }}
                >
                    View Reminders
                </Button>
            </Alert>
        </Snackbar>
    );
};

export default ReminderMessage;
