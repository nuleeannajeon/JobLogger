const axios = require('axios');

export default {
    checkSecured: async () => {},

    // SAMPLE INDEED API
    // getJobData: (query, location)=>{
    //     return axios({
    //         "method":"GET",
    //         "url":"https://indeed-com.p.rapidapi.com/search/jobs",
    //         "headers":{
    //         "content-type":"application/octet-stream",
    //         "x-rapidapi-host":"indeed-com.p.rapidapi.com",
    //         "x-rapidapi-key":
    //         "useQueryString":true
    //         },"params":{
    //         "sort": "relevance",
    //         "country": "ca",
    //         "query":query,
    //         "location":location
    //         }
    //         })
    //         .then((response)=>{
    //           console.log(response)
    //         })
    //         .catch((error)=>{
    //           console.log(error)
    //         })
    // },
    get: (url) => {
        console.log(localStorage);
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
