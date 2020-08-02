import React, { useEffect } from 'react';
import { useGlobalStore } from '../components/GlobalStore';
import { useHistory, Link } from 'react-router-dom';
import API from '../utils/API';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    addButton: {
        [theme.breakpoints.down('sm')]: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        desktopAdd: {
            [theme.breakpoints.up('md')]: {
                display: 'block',
            },
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            },
            //   marginRight: theme.spacing(1),
        },
    },
}));

const Content = () => {
    const classes = useStyles();
    const [globalStore, dispatch] = useGlobalStore();
    const history = useHistory();

    const getUserData = async () => {
        const userData = await API.getUserData();
        dispatch({ do: 'setUserData', ...userData });

        console.log(userData);
    };

    useEffect(() => {
        getUserData();
        //eslint-disable-next-line
    }, []);

    return (
        <div>
            Behold, you must be logged in to see me. Huraaaaaay.
            <p>Graphics design is my life, clearly</p>
            <Button
                onClick={() => {
                    history.push('/logout');
                }}
            >
                Log out
            </Button>
            <Fab color="primary" className={classes.addButton} aria-label="add post">
                <AddIcon />
            </Fab>
            <Button className={classes.desktopAdd} component={Link} to="/newpost">
                Add a post
            </Button>
        </div>
    );
};

export default Content;
