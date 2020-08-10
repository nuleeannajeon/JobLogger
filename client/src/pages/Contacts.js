import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    Typography,
    Divider,
    AccordionSummary,
    AccordionDetails,
    Accordion as BaseAccordion,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    IconButton,
    TextField,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ContactsIcon from '@material-ui/icons/Contacts';
import PhoneIcon from '@material-ui/icons/Phone';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import WorkIcon from '@material-ui/icons/Work';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';

// import MuiAccordion from '@material-ui/core/Accordion';
// import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
// import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
// import Typography from '@material-ui/core/Typography';
import API from '../utils/API';
import { useGlobalStore } from '../components/GlobalStore';
import processServerReturn from '../utils/processServerReturn';

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
    mainContainer: {
        paddingTop: theme.spacing(2),
    },
    accordionDetails: {
        position: 'relative',
    },
    editButton: {
        position: 'absolute',
        right: theme.spacing(1),
        bottom: theme.spacing(1),
    },
    inputContainer: {
        '& > *': {
            marginBottom: theme.spacing(2),
        },
        '& > *:last-child': {
            marginBottom: theme.spacing(5),
        },
    },
    name: {
        color: theme.palette.primary.main,
    },
    title: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        fontFamily: 'Quando',
    },
}));

const Accordion = withStyles({
    root: {
        border: '1px solid rgba(95, 158, 160, 0.6)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(BaseAccordion);

const ContactAccordion = (props) => {
    const classes = useStyles();
    const [, dispatch] = useGlobalStore();
    const { expanded, handleExpand } = props;
    const { id, name, title, email, phone, company, postID } = props;
    const [values, setValues] = useState({ id, name, title, email, phone, company, postID });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const submitEdit = async () => {
        const serverResponse = await API.put('/api/contacts', values);
        processServerReturn(serverResponse, dispatch);
    };

    const handleEdit = async () => {
        if (edit) {
            submitEdit();
            setEdit(false);
        } else {
            setEdit(true);
        }
    };

    const [edit, setEdit] = useState(false);
    const formatPhoneNumber = (phoneNumber) => {
        const nonNumberPattern = /[^0-9]*/gm;
        return phoneNumber.replace(nonNumberPattern, '');
    };

    return (
        <Accordion square expanded={expanded === id} onChange={handleExpand(id)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <span className={classes.name}>
                    {values.name} {values.company ? ' - ' + values.company : ''}
                </span>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
                <IconButton onClick={handleEdit} className={classes.editButton}>
                    <EditIcon />
                </IconButton>
                {!edit && (
                    <>
                        <List>
                            {values.title ? (
                                <ListItem>
                                    <ListItemIcon>
                                        <WorkIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={values.title} />
                                </ListItem>
                            ) : (
                                ''
                            )}
                            {values.phone ? (
                                <ListItem>
                                    <ListItemIcon>
                                        <PhoneIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <a
                                                href={`tel:${formatPhoneNumber(values.phone)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {values.phone}
                                            </a>
                                        }
                                    />
                                </ListItem>
                            ) : (
                                ''
                            )}
                            {values.email ? (
                                <ListItem>
                                    <ListItemIcon>
                                        <AlternateEmailIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <a
                                                href={`mailto:${values.email}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {values.email}
                                            </a>
                                        }
                                    />
                                </ListItem>
                            ) : (
                                ''
                            )}
                        </List>
                    </>
                )}
                {edit && (
                    <Grid container direction="column" alignItems="stretch" className={classes.inputContainer}>
                        <TextField
                            id="nameEdit"
                            label="Name"
                            variant="outlined"
                            value={values.name}
                            onChange={handleChange('name')}
                        />
                        <TextField
                            id="titleEdit"
                            label="Title"
                            variant="outlined"
                            value={values.title}
                            onChange={handleChange('title')}
                        />
                        <TextField
                            id="phoneEdit"
                            label="Phone"
                            variant="outlined"
                            value={values.phone}
                            onChange={handleChange('phone')}
                        />
                        <TextField
                            id="emailEdit"
                            label="Email"
                            variant="outlined"
                            value={values.email}
                            onChange={handleChange('email')}
                        />
                    </Grid>
                )}
            </AccordionDetails>
        </Accordion>
    );
};

const Contacts = () => {
    const [, dispatch] = useGlobalStore();
    const [contactsList, setContactsList] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const handleExpand = (id) => (event, isExpanded) => {
        setExpanded(isExpanded ? id : false);
    };

    const getContacts = async () => {
        const contacts = await API.get('/api/contacts');

        //check for error
        if (contacts.error) {
            dispatch({
                do: 'setMessage',
                type: 'error',
                message: contacts.error,
            });
            setTimeout(() => dispatch({ do: 'clearMessage' }), 2500);
            return;
        }

        setContactsList(contacts);
        if (contacts.length > 0) {
            setExpanded(contacts[0].id);
        }
    };

    useEffect(() => {
        getContacts();
    }, []);

    const classes = useStyles();
    return (
        <div>
            <div className={classes.hero}>
                <Typography variant="h3">
                    <ContactsIcon className={classes.heroIcon} />
                </Typography>
            </div>
            <Container maxWidth="sm">
                <Typography className={classes.title} variant="h4">
                    My Contacts
                </Typography>
                {contactsList.map((contact) => (
                    <ContactAccordion {...{ handleExpand, expanded }} {...contact} key={contact.id} />
                ))}
                {contactsList.length === 0 && (
                    <>
                        <Typography variant="subtitle1">You don't have any contacts added yet!</Typography>
                        <Typography variant="subtitle2">
                            On your overview page in either a new job, or an existing saved one, at the very bottom of
                            the dialog click the "Add contact" button to get started.
                        </Typography>
                    </>
                )}
            </Container>
        </div>
    );
};

export default Contacts;
