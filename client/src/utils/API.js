module.exports = {
    checkSecured: async () => {},

    get: (url) => {
        return fetch(url, {
            headers: { Session: localStorage.session ? JSON.parse(localStorage.session) : '' },
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
    getUserData: async (userId) => {
        return fetch(`/api/user/${userId}`, {
            headers: { Session: localStorage.session ? JSON.parse(localStorage.session) : '' },
        }).then((res) => res.json());
    },
};
