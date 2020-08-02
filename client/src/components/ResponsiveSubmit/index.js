import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
    saveButton: {
        margin: theme.spacing(1),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
        // margin: theme.spacing(1) + ' auto'
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));



const ResponsiveSubmit = (props) => {
    //requires a prop with the loading state in a boolean
    //also requires onsubmit action
    // and a name
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <Button
                variant="contained"
                color="primary"
                size="large"
                className={props.buttonClass || classes.saveButton}
                startIcon={props.icon || <SaveIcon />}
                onClick={props.submit}
                disabled={props.loading}
            >
                {props.name}
            </Button>
            {props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
    );
};

export default ResponsiveSubmit;
