import React, { useState, useEffect, useRef } from 'react';
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
import { IconButton, Input, InputLabel, FormControl } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

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
        '$ > *': {
            marginBottom: theme.spacing(1)
        }
    },
    input: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    contactButtonContainer: {
        padding: theme.spacing(1, 1),
    },
    // contactContainer: {
    //     position: 'relative',
    //     paddingBottom: theme.spacing(4)
    // },
    // editButton: {
    //     position: 'absolute',
    //     bottom: theme.spacing(1),
    //     right: theme.spacing(1),
    // },
}));

const Contact = (props) => {
    const contactInfo = props.contactInfo;
    const handleContactUpdate = props.handleContactUpdate
    const [contactVals, setContactVals] = useState({
        name: contactInfo.name,
        title: contactInfo.title,
        email: contactInfo.email,
        phone: contactInfo.phone,
        _id: contactInfo._id,
    });
    const [edit, setEdit] = useState(false);
    const classes = useStyles();

    const handleEdit = () => {
        setEdit(!edit);
    };

    const handleUpdate = () => {
        setEdit(false)
        handleContactUpdate(contactVals)
    };

    return (
        <Grid container>
            {!edit && (
                <Grid item>
                    <Typography variant="h5" className={classes.name}>
                        {contactVals.name} {contactVals.title ? ' - ' + contactVals.title : ''}
                    </Typography>
                    <List>
                        {contactVals.phone ? (
                            <ListItem>
                                <ListItemIcon>
                                    <PhoneIcon />
                                </ListItemIcon>
                                <ListItemText primary={contactVals.phone} />
                            </ListItem>
                        ) : (
                            ''
                        )}
                        {contactVals.email ? (
                            <ListItem>
                                <ListItemIcon>
                                    <AlternateEmailIcon />
                                </ListItemIcon>
                                <ListItemText primary={contactVals.email} />
                            </ListItem>
                        ) : (
                            ''
                        )}
                    </List>
                </Grid>
            )}
            {edit && (
                <NewContactArea contactVals={contactVals} setContactVals={setContactVals} handleSave={handleUpdate} />
            )}

            <Grid
                className={classes.contactButtonContainer}
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
            >
                <IconButton onClick={handleEdit} className={classes.editButton}>
                    <EditIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
};

const NewContactArea = (props) => {
    // const { values, handleChange } = props;
    //REFACTOR TO ALLOW FOR EDIT INSTEAD HAVE FLAG IN PROPS WITH DIF HANDLE SAVE?
    const { contactVals, setContactVals, handleSave } = props;
    // const [contactValsChild, setContactValsChild] = useState({
    //     name: '',
    //     title: '',
    //     email: '',
    //     phone: '',
    // });

    // useEffect(() => {
    //     setContactValsChild(contactVals);
    // }, [contactVals]);


    const handleChange = (prop) => (event) => {
        setContactVals({ ...contactVals, [prop]: event.target.value });
    };

    const classes = useStyles();

    return (
        <Grid container direction="column" alignItems="stretch" className={classes.newContainer}>
            {/* <TextField
                className={classes.input}
                autoFocus
                label="Contact Name"
                type="text"
                variant="outlined"
                values={contactVals.name}
                onChange={handleChange('name')}
            /> */}
            <FormControl className={classes.input}>
                <InputLabel htmlFor="nameInput">Name</InputLabel>
                <Input id="nameInput" value={contactVals.name} onChange={handleChange('name')} />
            </FormControl>
            <FormControl className={classes.input}>
                <InputLabel htmlFor="titleInput">Title</InputLabel>
                <Input id="titleInput" value={contactVals.title} onChange={handleChange('title')} />
            </FormControl>
            <FormControl className={classes.input}>
                <InputLabel htmlFor="emailInput">Email</InputLabel>
                <Input id="emailInput" value={contactVals.email} onChange={handleChange('email')} />
            </FormControl>
            <FormControl className={classes.input}>
                <InputLabel htmlFor="phoneInput">Phone</InputLabel>
                <Input id="phoneInput" value={contactVals.phone} onChange={handleChange('phone')} />
            </FormControl>
            {/* <TextField
                className={classes.input}
                label="Title"
                type="text"
                variant="outlined"
                values={contactVals.title}
                onChange={handleChange('title')}
            /> */}
            {/* <TextField
                className={classes.input}
                label="Email"
                type="text"
                variant="outlined"
                values={contactVals.email}
                onChange={handleChange('email')}
            />
            <TextField
                className={classes.input}
                label="Phone"
                type="text"
                variant="outlined"
                values={contactVals.phone}
                onChange={handleChange('phone')}
            /> */}
            <Grid container justify="center">
                <Button color="primary" onClick={handleSave}>
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
        setShowNewContact(!showNewContact);
    };

    const handleContactUpdate = (contactVals) => {
        //update the existing item in the companyContact child
        let currentContacts = values.companyContact
        const updatedContactIndex = currentContacts.findIndex(contact => contact._id === contactVals._id)
        currentContacts[updatedContactIndex] = contactVals
        setValues({...values, companyContact: currentContacts})        

    }

    return (
        <div>
            <Divider className={classes.divider} />
            <Grid container direction="column" alignItems="stretch">
                {values.companyContact.map((contact, ind) => (
                    <Contact key={ind} contactInfo={contact} handleContactUpdate={handleContactUpdate} />
                ))}
            </Grid>
            {values.companyContact.length > 0 && <Divider />}
            {showNewContact && (
                <NewContactArea contactVals={contactVals} setContactVals={setContactVals} handleSave={handleSaveNew} />
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
