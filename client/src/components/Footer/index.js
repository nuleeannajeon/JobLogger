import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
        // position
        padding: '5px 15vw',
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        // marginTop: '2em',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
}));

const Footer = (props) => {
    const classes = useStyles();

    const location = String(props.location.pathname)
    console.log("Footer -> location", location, props.location)

    if (String(location).includes('overview')) return ''

    return <div className={classes.footer}>&copy; 2020 League of Coders</div>;
};

export default Footer;
