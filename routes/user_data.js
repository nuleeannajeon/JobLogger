const secured = require('../auth');
const User = require('../models/userLogin');
const UserData = require('../models/userLogin');
module.exports = (router) => {
    router.get('/api/userdata', secured, async ({ headers }, res) => {
        try {
            const { session } = headers;
            const userData = await User.findOne({ session }).populate('userData').populate('posts');

            if (!userData) {
                console.log("This shouldn't happen, but an authenticated user has no data?");
                res.status(400).send({ error: 'No user found' });
                return;
            }
            const { name } = userData;
            const { school, location, portfolioLink, posts } = userData.userData;
            res.status(200).send({
                school,
                location,
                portfolioLink,
                posts,
                name,
            });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });

    router.put('/api/userdata', async ({ body, headers }, res) => {
        try {
            const { session } = headers;
            const user = await User.findOne({ session });

            if (!user) {
                console.log("This shouldn't happen, but an authenticated user has no data?");
                res.status(400).send({ error: 'No user found' });
                return;
            }

            const { school, location, portfolioLink } = body;
            if (!(school || location || portfolioLink)) {
                res.status(204).send({ message: 'Nothing was included to be changed' });
                return;
            }

            newData = { school, location, portfolioLink };
            await UserData.findByIdAndUpdate({ _id: user.userData }, newData);
            console.log("newData", newData)
            changedMessage = `Changed your ${Object.keys(newData).filter(item => newData[item]).join(', ')}`;
            res.status(200).send({ message: changedMessage });
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
