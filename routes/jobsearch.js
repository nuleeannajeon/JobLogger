const secured = require('../auth');
const axios = require('axios');
const db = require('../models');

module.exports = (router) => {
    router.get('/api/jobsearch/:query', secured, async ({ headers, params }, res) => {
        try {
            const { session } = headers;
            const { query } = params;
            const user = await db.UserLogin.findOne({ session });

            if (!user) {
                console.log("This shouldn't happen, but an authenticated user has no data?");
                res.status(400).send({ error: 'No user found' });
                return;
            }

            if (!user.userData) {
                console.log('there was an error creating a user, possilbly from a manually created user *cough*', user);
                res.status(500).send({ error: 'Server error: Missing associated data to user' });
                return;
            }
            console.log('query is ', query)
            const jobResults = await axios(`https://jobs.github.com/positions.json?page=1&search=${query}`).then(res => res.data);
            console.log("jobResults", jobResults)

            res.status(200).send({ data: jobResults });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
};
