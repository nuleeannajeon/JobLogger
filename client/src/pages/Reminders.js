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
import NotificationsIcon from '@material-ui/icons/Notifications';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
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
    title: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        fontFamily: 'Quando',
    },
}))



const EmptyRemindersContent = () => {
    return (
        <>
            <Typography variant='subtitle1'>You don't have any reminders set!</Typography>
            <Typography variant='subtitle2'>Go into the Overview page, and add some by editing a job.</Typography>
        </>
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
    const classes = useStyles()

    const checkForMessages = async () => {
        const reminders = await API.get('/api/reminders');
        // if (!reminders) {
        //     return;
        // }
        if (reminders.error){
            dispatch({
                do: 'setMessage',
                type: 'error',
                message: reminders.error,
            });
            setTimeout(() => dispatch({ do: 'clearMessage' }), 2500);
            return
        }

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
        <div>
            <div className={classes.hero}>
                <Typography variant="h3">
                    <NotificationsIcon className={classes.heroIcon} />
                </Typography>
            </div>
        <Container maxWidth="sm">
            <ConfirmationDialog id={dialogID} closeDialog={closeDialog} open={dialogOpen} deleteReminder={deleteReminder} />
            <Grid>
                <Typography variant="h4" className={classes.title}>Reminders</Typography>
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
        </div>
    );
};

export default Reminders;
