const secured = require('../auth');
const User = require('../models/userLogin');
const UserData = require('../models/userData');
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

    router.put('/api/userdata', secured, async ({ body, headers }, res) => {
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
                res.status(404).send({ message: 'Nothing was included to be changed' });
                return;
            }

            newData = { school, location, portfolioLink };
            Object.keys(newData).forEach((item) => {
                if (!newData[item]) delete newData[item];
            });
            // console.log("user id should be", user.userData)
            // console.log('yser not user', await UserData.find({}))

            await UserData.findByIdAndUpdate({ _id: user.userData }, newData);
            changedMessage = `Changed your ${Object.keys(newData).join(', ')}`;
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
