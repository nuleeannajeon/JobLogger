const secured = require('../auth');
const User = require('../models/userLogin');
const UserData = require('../models/userData');
module.exports = (router) => {
    router.get('/api/userdata', secured, async ({ headers }, res) => {
        try {
            const { session } = headers;
            const userData = await User.findOne({ session }).populate('userData');

            if (!userData) {
                console.log("This shouldn't happen, but an authenticated user has no data?");
                res.status(400).send({ error: 'No user found' });
                return;
            }
            const { name, school, location, portfolioLink, posts, totalPosts, createdAt } = userData.userData;
            const { thumbnail } = userData;
            console.log("userData", userData)
            const linkedinUser = Boolean(userData.authId)
            console.log("linkedinUser", linkedinUser)

            console.log('userData being sent', userData);
            res.status(200).send({
                school,
                location,
                portfolioLink,
                posts,
                name,
                totalPosts,
                createdAt,
                thumbnail,
                linkedinUser
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

            const { school, location, portfolioLink, name } = body;
            if (!(school || location || portfolioLink || name)) {
                res.status(404).send({ message: 'Nothing was included to be changed' });
                return;
            }

            newData = { school, location, portfolioLink, name };
            Object.keys(newData).forEach((item) => {
                if (!newData[item]) delete newData[item];
            });

            await UserData.findByIdAndUpdate({ _id: user.userData }, newData);
            changedMessage = `Changed your ${Object.keys(newData).join(', ')}`;
            res.status(200).send({ message: changedMessage });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
};
