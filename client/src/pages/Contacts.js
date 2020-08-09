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
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ContactsIcon from '@material-ui/icons/Contacts';
import PhoneIcon from '@material-ui/icons/Phone';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import WorkIcon from '@material-ui/icons/Work';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// import MuiAccordion from '@material-ui/core/Accordion';
// import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
// import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
// import Typography from '@material-ui/core/Typography';
import API from '../utils/API';
import { useGlobalStore } from '../components/GlobalStore';

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
    const { expanded, handleExpand, contact } = props;

    const { id, name, title, email, phone, company } = props;
    const formatPhoneNumber = (phoneNumber) => {
        const nonNumberPattern = /[^0-9]*/gm;
        return phoneNumber.replace(nonNumberPattern, '');
    };

    return (
        <Accordion square expanded={expanded === id} onChange={handleExpand(id)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                {name} {company ? ' - ' + company : ''}
            </AccordionSummary>
            <AccordionDetails>
                <List>
                    {title ? (
                        <ListItem>
                            <ListItemIcon>
                                <WorkIcon />
                            </ListItemIcon>
                            <ListItemText primary={title} />
                        </ListItem>
                    ) : (
                        ''
                    )}
                    {phone ? (
                        <ListItem>
                            <ListItemIcon>
                                <PhoneIcon />
                            </ListItemIcon>
                            <ListItemText primary={<a href={`tel:${formatPhoneNumber(phone)}`} target="_blank" rel="noopener noreferrer">{phone}</a>} />
                        </ListItem>
                    ) : (
                        ''
                    )}
                    {email ? (
                        <ListItem>
                            <ListItemIcon>
                                <AlternateEmailIcon />
                            </ListItemIcon>
                            <ListItemText primary={<a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">{email}</a>} />
                        </ListItem>
                    ) : (
                        ''
                    )}
                </List>
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
            <Container maxWidth="sm" className={classes.mainContainer}>
                {contactsList.map((contact) => (
                    <ContactAccordion {...{ handleExpand, expanded }} {...contact} key={contact.id} />
                ))}
            </Container>
        </div>
    );
};

export default Contacts;
