import React, { useState, useEffect } from 'react';
import { useGlobalStore } from '../GlobalStore';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import API from '../../utils/API';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const ReminderMessage = () => {
    const [, dispatch] = useGlobalStore()
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(null);
    const history = useHistory();
    // const [globalData] = useGlobalStore();

    const checkForMessages = async () => {
        const reminders = await API.get('/api/reminders');
        dispatch({ do: 'setUserData', reminders: reminders.length > 0 });

        if (reminders.length === 0) {
            return;
        }

        const reminderNames = reminders.map((reminder) => `${reminder.company} - ${reminder.title}`);
        setMessage(`You have reminders: ${reminderNames.join(', ')}`);
        setOpen(true);
    };

    useEffect(() => {
        checkForMessages();
        //eslint-disable-next-line
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
