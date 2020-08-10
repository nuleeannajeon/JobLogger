require( 'dotenv' ).config();

export default {
    checkSecured: async () => {},

    get: (url) => {
        return fetch(url, {
            headers: { Session: localStorage.session ? localStorage.session : '' },
        }).then((result) => result.json());
    },

    post: async (url, userData) => {
        return fetch(url, {
            method: 'post',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                Session: localStorage.session ? localStorage.session : '',
            },
            body: JSON.stringify(userData),
        })
            .then((result) => result.json())
            .catch((err) => console.log(err));
    },
    put: async (url, userData) => {
        return fetch(url, {
            method: 'put',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                Session: localStorage.session ? localStorage.session : '',
            },
            body: JSON.stringify(userData),
        })
            .then((result) => result.json())
            .catch((err) => console.log(err));
    },
    delete: async (url) => {
        return fetch(url, {
            method: 'delete',
            headers: { Session: localStorage.session ? localStorage.session : '' },
        })
            .then((result) => result.json())
            .catch((err) => console.log(err));
    },
    getUserData: async () => {
        return fetch('/api/userdata/', {
            headers: { Session: localStorage.session ? localStorage.session : '' },
        }).then((res) => res.json());
    },
    getUserPosts: async () => {
        return fetch('/api/posts', {
            headers: { Session: localStorage.session ? localStorage.session : '' },
        }).then((res) => res.json());
    },
    getLoggedState: async () => {
        return fetch('/loginstatus', {
            headers: { Session: localStorage.session ? localStorage.session : '' },
        })
            .then((res) => res.json())
            .then((res) => (res.error ? false : res.loggedIn));
    },
};
