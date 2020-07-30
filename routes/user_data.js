const secured = require('../auth');
const UserData = require('../models/userData');

module.exports = (router) => {
    router.get('/api/user/:userId', secured, async ({ params }, res) => {
        const { userId } = params;
        console.log("HERE",userId)
        try {
            const user = await UserData.findById({ _id: userId });
            if (!user) {
                console.log("This error shouldn't happen, but an invalid user id was recieved for a logged in user");
                res.status(400).send({ error: 'No user with that id located' });
            }
            res.status(200).send(user);
        } catch (err) {
            console.log('error inside check for user data', err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
};
