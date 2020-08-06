import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
        // position
    }
}))


const Footer = () => {
    const classes = useStyles()
    return (
        <div className={classes.footer}>
            	&copy; 2020 League of Coders
        </div>
    )
}

export default Footer;
