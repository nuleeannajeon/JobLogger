import React from 'react';
import { useGlobalStore } from '../GlobalStore';
import Alert from '@material-ui/lab/Alert';
import './style.css';

const Message = () => {
    const [globalData] = useGlobalStore();

    const AlertMessage = () => (
        <Alert className="alertMessage" elevation={6} variant="filled" severity={globalData.messageType}>
            {globalData.message}
        </Alert>
    );

    return <>{globalData.message ? <AlertMessage /> : ''}</>;
};

export default Message;
