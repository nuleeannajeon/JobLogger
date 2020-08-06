import React, { useEffect, useState } from 'react';
import { useGlobalStore } from '../components/GlobalStore';
import API from '../utils/API';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LoadingOverlay from '../components/LoadingOverlay';
import JourneyHeader from '../components/JourneyHeader';
// import PostsGraph from '../components/PostsGraph'

const useStyles = makeStyles((theme) => ({
    spaceMe: {
        margin: '1em 0',
    },
}));

const convertToRelativeTime = (date) => {
    if (!date) {
        return '';
    }
    const startDate = new Date(date);
    const now = new Date();
    const hour = 1000 * 60 * 60;
    const day = hour * 24;
    const diffMS = Math.abs(now - startDate);
    const diffDays = Math.floor(diffMS / day);
    const diffHours = Math.floor((diffMS - diffDays * day) / hour);
    const diffMins = Math.floor((diffMS - (diffDays * day + diffHours * hour)) / (1000 * 60));

    let retString = [];
    if (diffDays) retString.push(` ${diffDays} day${diffDays === 1 ? '' : 's'}`);
    if (diffHours) retString.push(` ${diffHours} hour${diffHours === 1 ? '' : 's'}`);
    if (diffMins) retString.push(` ${diffMins} minute${diffMins === 1 ? '' : 's'}`);
    if (!retString) return ' no time at all ';
    return retString.join(', ');
};

const MyJourney = () => {
    const classes = useStyles();
    const [globalStore, dispatch] = useGlobalStore();
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([])

    const getUserData = async () => {
        const userData = await API.getUserData();
        console.log('getUserData -> userData', userData);
        const posts = await API.getUserPosts();
        setPosts(posts.message)
        console.log("getUserData -> posts.message", posts.message)
        if (userData.error || posts.error) {
            dispatch({
                do: 'setMessage',
                type: 'error',
                message: userData.error || posts.error,
            });
            setTimeout(() => dispatch({ do: 'clearMessage' }), 2500);
            setLoading(false);
            return;
        }
        dispatch({ do: 'setUserData', ...userData });
        setLoading(false);
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <Container maxWidth="lg">
            <LoadingOverlay open={loading} />
            <JourneyHeader />
            <Typography className={classes.spaceMe}>
                It's been {convertToRelativeTime(globalStore.createdAt)} since you made your account with JobLogger. In
                that time you've added a total of {globalStore.totalPosts} jobs to your list.
            </Typography>
            {/* <PostsGraph posts={posts} /> */}
        </Container>
    );
};

export default MyJourney;
