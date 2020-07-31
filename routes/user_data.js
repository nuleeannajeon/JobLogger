const secured = require('../auth');
const User = require('../models/userLogin');

module.exports = (router) => {
    router.get('/api/userdata', secured, async ({ headers }, res) => {
        try {
            const { session } = headers;
            const userData = await User.findOne({ session }).populate('userData').populate('posts');

            if (!userData) {
                console.log("This shouldn't happen, but an authenticated user has no data?");
                res.status(400).send({ error: 'No user found' });
            }
            const { school, location, portfolioLink, posts } = userData.userData;
            res.status(200).send({
                school,
                location,
                portfolioLink,
                posts,
            });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });

    // ROUTES FOR CRUD

    // edit school

    // edit location

    // edit portfolio link

    // add post

    // remove post

    // edit post
};
