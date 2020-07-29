//This is a place we can keep any global settings.  Themes, functions, whatever
import React, { useContext, useReducer } from 'react';

// default global store
const defaultGlobalStore = { messageType: '', message: '' };

const GlobalData = React.createContext();

let lastDispatcher = { do: '', time: 0 };

function dispatcher(state, action) {
    if (action.do == lastDispatcher.do && Date.now() - lastDispatcher.time < 1000) {
        return state; //cancelling action because repeated within a second
    }
    lastDispatcher = { do: action.do, time: Date.now() };

    let newState = { ...state };
    switch (action.do) {
        case 'setMessage':
            newState.messageType = action.type;
            newState.message = action.message;
            return newState;

        case 'clearMessage':
            newState.messageType = '';
            newState.message = '';
            return newState;
        default:
            console.log(`unknown action called from GlobalStore.js: ${action.do}`);
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