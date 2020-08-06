//This is a place we can keep any global settings.  Themes, functions, whatever
import React, { useContext, useReducer } from 'react';

// default global store
const defaultGlobalStore = {
    messageType: '',
    message: '',
    loggedIn: false,
    userId: '',
    name: '',
    school: '',
    location: '',
    posts: [],
    portfolioLink: '',
    totalPosts: 0,
    createdAt: '',
    thumbnail: '',
    reminders: false,
    linkedinUser: false,
};

const GlobalData = React.createContext();

// let lastDispatcher = { do: '', time: 0 };

function dispatcher(state, action) {
    console.log('GlobalDispatcher ', action, state);
    // if (action.do === lastDispatcher.do && Date.now() - lastDispatcher.time < 1000) {
    //     console.log('Cancelling action')
    //     return state; //cancelling action because repeated within a second
    // }
    // lastDispatcher = { do: action.do, time: Date.now() };
    let newState = { ...state };
    switch (action.do) {
        case 'setUserData':
            ['name', 'school', 'location', 'posts', 'portfolioLink', 'totalPosts', 'createdAt', 'thumbnail', 'reminders', 'linkedinUser'].forEach(
                (item) => {
                    if (action[item]) {
                        newState[item] = action[item];
                    }
                }
            );
            return newState;
        case 'setMessage':
            newState.messageType = action.type;
            newState.message = action.message;
            return newState;
        case 'clearMessage':
            newState.messageType = '';
            newState.message = '';
            return newState;
        case 'login':
            newState.loggedIn = true;
            return newState;
        case 'logout':
            newState.loggedIn = false;
            newState.userId = '';
            return newState;
        default:
            console.log(`unknown action called from GlobalStore: ${action.do}`);
            break;
    }
}

function GlobalStore(props) {
    const [globalData, dispatch] = useReducer(dispatcher, defaultGlobalStore);

    return <GlobalData.Provider value={[globalData, dispatch]} {...props} />;
}

function useGlobalStore() {
    return useContext(GlobalData);
}

export { GlobalStore, useGlobalStore };
