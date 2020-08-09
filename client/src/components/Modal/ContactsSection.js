import React, { useState } from 'react';
import { Grid, Divider, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PhoneIcon from '@material-ui/icons/Phone';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useGlobalStore } from '../GlobalStore';
 


const useStyles = makeStyles((theme) => ({
    addButton: {
        marginTop: theme.spacing(1),
    },
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    title: {
        fontFamily: 'Varela Round',
    },
    name: {
        fontFamily: 'Shanti',
        color: theme.palette.primary.main,
    },
    detail: {
        fontSize: '0.8em',
    },
    newContainer: {
        padding: theme.spacing(1),
    },
    input: {
        width: '100%',
        marginBottom: theme.spacing(1),
    },
}));

const Contact = (props) => {
    const { name, title, email, phone } = props.contactInfo;
    const [edit, setEdit] = useState(false);
    const classes = useStyles();
    return (
        <div>
            {!edit && (
                <>
                    <Typography variant="h5" className={classes.name}>
                        {name} {title ? ' - ' + title : ''}
                    </Typography>
                    <List>
                        {phone ? (
                            <ListItem>
                                <ListItemIcon>
                                    <PhoneIcon />
                                </ListItemIcon>
                                <ListItemText primary={phone} />
                            </ListItem>
                        ) : (
                            ''
                        )}
                        {email ? (
                            <ListItem>
                                <ListItemIcon>
                                    <AlternateEmailIcon />
                                </ListItemIcon>
                                <ListItemText primary={email} />
                            </ListItem>
                        ) : (
                            ''
                        )}
                    </List>
                </>
            )}
        </div>
    );
};

const NewContactArea = (props) => {
    // const { values, handleChange } = props;
    const { contactVals, setContactVals, handleSaveNew } = props;

    const handleChange = (prop) => (event) => {
        setContactVals({ ...contactVals, [prop]: event.target.value });
    };

    const classes = useStyles();

    return (
        <Grid container direction="column" alignItems="stretch" className={classes.newContainer}>
            <TextField
                className={classes.input}
                autoFocus
                label="Contact Name"
                type="text"
                values={contactVals.name}
                onChange={handleChange('name')}
            />
            <TextField
                className={classes.input}
                label="Title"
                type="text"
                values={contactVals.title}
                onChange={handleChange('title')}
            />
            <TextField
                className={classes.input}
                label="Email"
                type="text"
                values={contactVals.email}
                onChange={handleChange('email')}
            />
            <TextField
                className={classes.input}
                label="Phone"
                type="text"
                values={contactVals.phone}
                onChange={handleChange('phone')}
            />
            <Grid container justify="center">
                <Button color="primary" onClick={handleSaveNew}>
                    Save
                </Button>
            </Grid>
            <Divider className={classes.divider} />
        </Grid>
    );
};

const ContactsSection = (props) => {
    const [, dispatch] = useGlobalStore();
    const { values, setValues } = props;
    const emptyContact = {
        name: '',
        title: '',
        email: '',
        phone: '',
    };
    const [contactVals, setContactVals] = useState(emptyContact);

    const handleSaveNew = () => {
        if (contactVals.name.trim() === '') {
            dispatch({ do: 'setMessage', type: 'error', message: 'Your contact needs a name' });
            setTimeout(() => dispatch({ do: 'clearMessage' }), 2000);
            return;
        }

        let currentContacts = values.companyContact;
        currentContacts.push(contactVals);
        setContactVals(emptyContact);
        setValues({ ...values, companyContact: currentContacts });
        setShowNewContact(false);
    };

    const [showNewContact, setShowNewContact] = useState(false);
    const classes = useStyles();

    const handleNewContact = () => {
        setShowNewContact(true);
    };

    return (
        <div>
            <Divider className={classes.divider} />
            <Grid container direction="column" alignItems="stretch">
                {values.companyContact.map((contact, ind) => (
                    <Contact key={ind} contactInfo={contact} />
                ))}
            </Grid>
            {values.companyContact.length > 0 && <Divider />}
            {showNewContact && (
                <NewContactArea
                    contactVals={contactVals}
                    setContactVals={setContactVals}
                    handleSaveNew={handleSaveNew}
                />
            )}
            <Grid container direction="row" justify="center" alignItems="center">
                <Button className={classes.addButton} onClick={handleNewContact}>
                    Add a contact
                </Button>
            </Grid>
        </div>
    );
};

export default ContactsSection;
