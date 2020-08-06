// import { useGlobalStore } from '../components/GlobalStore';

export default (serverReturn, dispatch) => {
    console.log('serverReturn', serverReturn);
    // const [, dispatch] = useGlobalStore();
    if (!serverReturn) {
        dispatch({
            do: 'setMessage',
            type: 'error',
            message: 'The server is down',
        });
        setTimeout(() => dispatch({ do: 'clearMessage' }), 2500);
        return;
    }

    if (serverReturn.error) {
        dispatch({
            do: 'setMessage',
            type: 'error',
            message: serverReturn.error,
        });
        setTimeout(() => dispatch({ do: 'clearMessage' }), 2500);
        return;
    }

    if (serverReturn.message) {
        dispatch({
            do: 'setMessage',
            type: 'success',
            message: serverReturn.message,
        });
        setTimeout(() => dispatch({ do: 'clearMessage' }), 2500);
        return;
    }
};
