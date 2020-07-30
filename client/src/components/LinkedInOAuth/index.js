import React, { useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const API_URL = window.location.protocol + '//' + window.location.host.replace('localhost:3000', 'localhost:3001');

let oAuthWindow;
let oAuthPending = false;

function OAuth(props) {
    useEffect(function () {
        window.addEventListener(
            'message',
            function (event) {
                if (
                    !(
                        event &&
                        event.data &&
                        typeof event.data === 'string' &&
                        event.data.substr(0, 1) === '{' &&
                        event.data.substr(-1, 1) === '}'
                    )
                )
                    return;

                const loginData = JSON.parse(event.data);
                console.log(`Popup window has returned`, loginData);
                if (oAuthWindow) oAuthWindow.close();
                if (props.loginComplete) props.loginComplete(loginData);
            },
            false
        );
    }, []);

    function openOAuth() {
        if (oAuthPending) return;

        const width = 600,
            height = 600;
        const left = window.innerWidth / 2 - width / 2;
        const top = window.innerHeight / 2 - height / 2;
        const url = `${API_URL}/oauth/linkedin`;
        console.log(`[openOAuth] opening url: ${url}`);
        oAuthWindow = window.open(
            url,
            '',
            `toolbar=no, location=no, directories=no, status=no, menubar=no, 
          scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
          height=${height}, top=${top}, left=${left}`
        );

        oAuthPending = true;
        // monitor popup
        checkPopup();
    }

    function checkPopup() {
        const check = setInterval(() => {
            if (!oAuthWindow || oAuthWindow.closed || oAuthWindow.closed === undefined) {
                clearInterval(check);
                oAuthPending = false;
            }
        }, 1000);
    }

    return (
        <div>
            <IconButton onClick={() => openOAuth()} color="primary" aria-label="login with linkedin" component="span">
                <LinkedInIcon />
            </IconButton>
        </div>
    );
}

export default OAuth;
