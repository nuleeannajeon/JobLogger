import React from 'react';
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
        fontFamily: "Varela Round",
    },
}));

const Footer = (props) => {
    const classes = useStyles();

    const location = String(props.location.pathname)

    if (String(location).includes('overview')) return ''

    return <div className={classes.footer}>&copy; 2020 League of Coders</div>;
};

export default Footer;
