module.exports = {
    checkSecured: async () => {
        
    },

    get: ( url ) => {
        return fetch( url, 
            { headers: { 'Session': localStorage.session ? localStorage.session : '' } })
            .then( result=>result.json() );
    },
    
    post: ( url, userData ) => {
        return fetch( url, 
            {   method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Session': localStorage.session ? localStorage.session : ''
                },
                body: JSON.stringify(userData)
            }).then( result=>result.json());
    }


}