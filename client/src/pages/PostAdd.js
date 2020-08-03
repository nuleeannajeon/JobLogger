import React, { useEffect, useState } from 'react';
import { useGlobalStore } from '../components/GlobalStore';
import { useHistory } from 'react-router-dom';
import API from '../utils/API';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    saveButton: {
        margin: theme.spacing(1),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },

    centeringContainer: {
        width: '100%',
        marginTop: theme.spacing(2),
    },
    input: {
        marginTop: theme.spacing(3),
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
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

const PostAdd = () => {
    const [globalStore, dispatch] = useGlobalStore();
    const history = useHistory();
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);

    const [values, setValues] = useState({
        companyName: '',
        position: '',
        linkToPosting: '',
        dateFound: '',
        salary: '',
        location: '',
        notes: '',
    });

    const handleSaveButton = () => {
        console.log('Saved not implemented');
        setLoading(true);
    };

    const getUserData = async () => {
        const userData = await API.getUserData();
        dispatch({ do: 'setUserData', ...userData });
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    useEffect(() => {
        getUserData();
        //eslint-disable-next-line
    }, []);

    return (
        <Container maxWidth="sm">
            <Grid container direction="column" justify="space-between" align-items="stretch">
                <TextField
                    label="Company Name"
                    required={true}
                    className={classes.input}
                    type="text"
                    value={values.companyName}
                    onChange={handleChange('companyName')}
                    // InputProps={{
                    //     endAdornment: <InputAdornment position="end">{props.icon}</InputAdornment>,
                    // }}
                />
                <TextField
                    label="Position Title"
                    required={true}
                    className={classes.input}
                    type="text"
                    value={values.position}
                    onChange={handleChange('position')}
                    // InputProps={{
                    //     endAdornment: <InputAdornment position="end">{props.icon}</InputAdornment>,
                    // }}
                />
                <TextField
                    className={classes.input}
                    label="Link to the posting"
                    // required={true}
                    // className={props.className}
                    type="text"
                    value={values.linkToPosting}
                    onChange={handleChange('linkToPosting')}
                    // InputProps={{
                    //     endAdornment: <InputAdornment position="end">{props.icon}</InputAdornment>,
                    // }}
                />
                {/* DATE */}
                <TextField
                    className={classes.input}
                    label="Salary"
                    // required={true}
                    // className={props.className}
                    type="number"
                    value={values.salary}
                    onChange={handleChange('salary')}
                    // InputProps={{
                    //     endAdornment: <InputAdornment position="end">{props.icon}</InputAdornment>,
                    // }}
                />
                <TextField
                    className={classes.input}
                    label="Location"
                    // required={true}
                    // className={props.className}
                    type="text"
                    value={values.location}
                    onChange={handleChange('location')}
                    // InputProps={{
                    //     endAdornment: <InputAdornment position="end">{props.icon}</InputAdornment>,
                    // }}
                />
                <TextField
                    className={classes.input}
                    label="Notes"
                    // required={false}
                    // className={props.className}
                    type="text"
                    multiline
                    value={values.notes}
                    onChange={handleChange('notes')}
                    // InputProps={{
                    //     endAdornment: <InputAdornment position="end">{props.icon}</InputAdornment>,
                    // }}
                />
            </Grid>
            <Grid container justify="center" className={classes.centeringContainer}>
                <div className={classes.wrapper}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.saveButton}
                        startIcon={<SaveIcon />}
                        onClick={handleSaveButton}
                        disabled={loading}
                    >
                        Save
                    </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
            </Grid>
        </Container>
    );
};

export default PostAdd;
