import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import RegisterBox from '../components/RegisterBox'
import LoginBox from '../components/LoginBox'


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
    container: {
        height: '90vh',
    },
    box: {
        maxWidth: '80vw',
        minWidth: '60vw',
        minHeight: '50vh'
        //PUT IN MEDIA QUERY TO SERVE FULL WIDTH, USE FIXED SIZES
        //ADD BACKGROUND
    },
}));

const TabItem = (props) => {

    if (props.tab !== props.currentTab) return ''

    return <>{props.children}</>
    
}

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
        <Container maxWidth="lg">
            <Grid className={classes.container} container direction="column" justify="center" alignItems="center">
                <Paper elevation={3} className={classes.box}>
                    <CoolTabs
                        className={classes.tabs}
                        value={tab}
                        onChange={handleTabChange}
                        aria-label="log in options tabs"
                        TabIndicatorProps={{ children: <span /> }}
                    >
                        <Tab disableRipple className={classes.tab} label="Log in" />
                        <Tab disableRipple className={classes.tab} label="Register" />
                    </CoolTabs>
                    <TabItem tab={0} currentTab={tab}>
                        <LoginBox />
                    </TabItem>
                    <TabItem tab={1} currentTab={tab}>
                        <RegisterBox />
                    </TabItem>
                </Paper>
            </Grid>
        </Container>
    );
};

export default UserEntry;
