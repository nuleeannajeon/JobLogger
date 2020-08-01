const secured = require('../auth');
// const User = require('../models/userLogin');
// const UserData = require('../models/userData');
const db = require('../models');

module.exports = (router) => {
    router.get('/api/posts', secured, async ({ headers }, res) => {
        try {
            const { session } = headers;
            const user = await db.UserLogin.findOne({ session }).populate({
                path: 'userData',
                populate: { path: 'posts' },
            });

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

            res.status(200).send({ message: user.userData.posts });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });

    router.post('/api/posts', secured, async ({ headers, body }, res) => {
        try {
            const { session } = headers;
            const user = await db.UserLogin.findOne({ session });

            if (!user) {
                console.log("This shouldn't happen, but an authenticated user has no data?");
                res.status(400).send({ error: 'No user found' });
                return;
            }

            const newPost = await db.Posts.create(body);
            await db.UserData.findByIdAndUpdate({ _id: user.userData }, { $push: { posts: newPost._id } });

            res.status(200).send({ message: 'Post successfully added', messageData: newPost });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server', errorMessage: err });
        }
    });

    router.put('/api/posts', secured, async ({ headers, body }, res) => {
        try {
            const { session } = headers;
            const user = await User.findOne({ session });

            if (!user) {
                console.log("This shouldn't happen, but an authenticated user has no data?");
                res.status(400).send({ error: 'No user found' });
                return;
            }

            res.status(200).send({ message: 'Route not yet implemented' });
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });

    // router.get('/api/posts', secured, async (req, res) => {
    //     try {
    //         const { session } = headers;
    //         const user = await User.findOne({ session });

    //         if (!user) {
    //             console.log("This shouldn't happen, but an authenticated user has no data?");
    //             res.status(400).send({ error: 'No user found' });
    //             return;
    //         }

    //         res.status(200).send({ message: "Not yet implemented" });
    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).send({ error: 'Something went wrong with the server' });
    //     }
    // });
};
