import React, { useState, useEffect } from 'react';
import { useGlobalStore } from '../components/GlobalStore';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import API from '../utils/API';
import processServerReturn from '../utils/processServerReturn';
import SmallPost from '../components/SmallPost';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button'

const EmptyRemindersContent = () => {
    return (
        <p style={{marginTop: '4em'}}>
            <Typography variant='subtitle1'>You don't have any reminders set!</Typography>
            <Typography variant='subtitle1'>Go into the Overview page, and add some by editing a job.</Typography>
        </p>
    )
}



const ConfirmationDialog = (props) => {
    return (
        <Dialog
            maxWidth="xs"
            aria-labelledby="confirmation-remove-reminder"
            open={props.open}
        >
            <DialogTitle id="confirmation-remove-reminder">Remove Reminder?</DialogTitle>

            <DialogContent dividers>Are you sure you want to remove the reminder?</DialogContent>

            <DialogActions>
                <Button autoFocus onClick={props.closeDialog}>
                    Cancel
                </Button>
                <Button onClick={() => props.deleteReminder(props.id)} color="secondary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const Reminders = () => {
    const [, dispatch] = useGlobalStore();
    const [posts, setPosts] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogID, setDialogID] = useState(null)

    const checkForMessages = async () => {
        const reminders = await API.get('/api/reminders');
        // if (!reminders) {
        //     return;
        // }
        dispatch({ do: 'setUserData', reminders: reminders.length > 0 });
        setPosts(reminders);
    };

    const removeReminder = (id) => {
        //prompt, then remove
        setDialogID(id)
        setDialogOpen(true)
    };

    const closeDialog = () => {
        setDialogOpen(false)
    }

    const deleteReminder = async (id) => {
        const serverResponse = await API.put(`/api/postreminders/${id}`, {reminder: 'unset'})
        processServerReturn(serverResponse, dispatch)
        setDialogOpen(false)
        checkForMessages()
    }

    useEffect(() => {
        checkForMessages();
        //eslint-disable-next-line
    }, []);

    return (
        <Container maxWidth="sm">
            <ConfirmationDialog id={dialogID} closeDialog={closeDialog} open={dialogOpen} deleteReminder={deleteReminder} />
            <Grid>
                <Typography variant="h4">Reminders</Typography>
                {posts.map((reminder) => (
                    <SmallPost
                        {...reminder}
                        deleteText="Remove Reminder"
                        rerender={checkForMessages}
                        handleDelete={removeReminder}
                        key={reminder._id}
                    />
                ))}
                {posts.length === 0 && <EmptyRemindersContent />}
            </Grid>
        </Container>
    );
};

export default Reminders;
