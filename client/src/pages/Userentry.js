import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import './UserEntry.css';
import RegisterBox from '../components/RegisterBox';
import LoginBox from '../components/LoginBox';

const useStyles = makeStyles((theme) => ({
    tab: {
        fontFamily: 'Josefin Sans',
    },
    tabs: {
        '& > span': {
            maxWidth: '42px',
            width: '100%',
        },
    },
    outerContainer: {
        paddingTop: '4em',
    },
    container: {
        // height: '90vh',
    },
    box: {
        // maxWidth: '80vw',
        // minWidth: '60vw',
        width: '80ch',
        height: '80ch',
        position: 'relative',
        // minHeight: '50vh',
        padding: '0 2em',
        // '&::before': {
        //     content: ' ',
        //     position: 'absolute',
        //     backgroundColor: 'rgba(0, 0, 0, 0.25)',
        //     top: '0px',
        //     left: '0px',
        //     right: '0px',
        //     bottom: '0px',
        //     // opacity: 0.5,
        // },
        [theme.breakpoints.down('xs')]: {
            // width: 'auto',
            marginTop: '2em',
            padding: '0',
            width: '100%',
            height: '60ch',
        },
        //PUT IN MEDIA QUERY TO SERVE FULL WIDTH, USE FIXED SIZES
        //ADD BACKGROUND
    },
    tabContainer: {
        paddingTop: '5em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        // justifyContent: 'center',
        // outline: '1px solid red',
        height: '100%',
    },
}));

const TabItem = (props) => {
    if (props.tab !== props.currentTab) return '';

    return <div>{props.children}</div>;
};

const CoolTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            maxWidth: 42,
            width: '100%',
            backgroundColor: '#605fa0',
        },
    },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const UserEntry = () => {
    const classes = useStyles();
    const [tab, setTab] = useState(0);

    const handleTabChange = (event, newVal) => {
        setTab(newVal);
    };

    return (
        <Container className={classes.outerContainer} maxWidth="lg">
            <Grid className={classes.container} container direction="column" justify="center" alignItems="center">
                <Paper elevation={3} className={[classes.box, 'bg'].join(' ')}>
                    <CoolTabs
                        centered
                        className={classes.tabs}
                        value={tab}
                        onChange={handleTabChange}
                        aria-label="log in options tabs"
                        TabIndicatorProps={{ children: <span /> }}
                    >
                        <Tab disableRipple className={classes.tab} label="Log in" />
                        <Tab disableRipple className={classes.tab} label="Register" />
                    </CoolTabs>
                    <div className={classes.tabContainer}>
                        <TabItem tab={0} currentTab={tab}>
                            <LoginBox />
                        </TabItem>
                        <TabItem tab={1} currentTab={tab}>
                            <RegisterBox />
                        </TabItem>
                    </div>
                </Paper>
            </Grid>
        </Container>
    );
};

export default UserEntry;
