import React, { useEffect, useState } from 'react';
import ViewPost from '../components/ViewPost';
import { useGlobalStore } from '../components/GlobalStore';
import { makeStyles } from '@material-ui/core/styles';
import API from '../utils/API'

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

const Testing = (props) => {
    const classes = useStyles();
    const [globalStore, dispatch] = useGlobalStore();
    const [post, setPost] = useState(null)

    const getUserData = async () => {
        const userData = await API.getUserData();
        const posts = await API.getUserPosts().then(res => res.message);
        console.log("getUserData -> posts", posts)
        dispatch({ do: 'setUserData', ...userData });
        dispatch({ do: 'setUserData', posts });

        //FOR TESTING
        setPost(posts[0])

        console.log(userData);
    };

    useEffect(() => {
        getUserData();
        //eslint-disable-next-line
    }, []);

    if (!post) return <p>Loading</p>
    console.log('here')
    return (
        <div>
            <ViewPost {...post} />
        </div>
    );
};

export default Testing;
