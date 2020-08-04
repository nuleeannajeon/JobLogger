import React from 'react';
// import headerImage from './marten-bjork-6dW3xyQvcYE-unsplash.jpg';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    heroImage: {
        width: '100%',
        height: 'auto',
    },
    heroDiv: {
        height: '30vw',
        width: '100%',
        overFlow: 'hidden',
        backgroundImage: 'url(./assets/marten-bjork-6dW3xyQvcYE-removebg.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'relative',
    },
    heroText: {
        position: 'absolute',
        left: '20%',
        top: '40%',
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
            left: '10%',
        },
    },
}));

const JourneyHeader = () => {
    const classes = useStyles();
    return (
        <div className={classes.heroDiv}>
            <Typography variant="h3" className={classes.heroText}>
                My Journey
            </Typography>
            {/* <img className={classes.heroImage} src={headerImageTransparent} alt="Your Journey" /> */}
        </div>
    );
};

export default JourneyHeader;
