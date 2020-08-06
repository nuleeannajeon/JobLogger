const secured = require('../auth');
// const User = require('../models/userLogin');
// const UserData = require('../models/userData');
const db = require('../models');

module.exports = (router) => {
    router.get('/api/reminders', secured, async ({ headers }, res) => {
        try {
            const { session } = headers;
            const user = await db.UserLogin.findOne({ session }).populate({
                path: 'userData',
                populate: { path: 'posts' },
            });
            console.log('user', user);

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

            //checking if any of the reminders are for today
            const today = new Date();
            const { posts } = user.userData;
            const reminders = posts
                .filter((post) => post.reminder)
                .filter((post) => {
                    const date = new Date(post.reminder);
                    console.log('date', date.getTime(), today.getTime(), date.getTime() < today.getTime());
                    // return (date.getFullYear() <= today.getFullYear() && date.getMonth() <= today.getMonth() && date.getDate() <= today.getDate()) //I'm an idiot
                    return (
                        date.getTime() < today.getTime() ||
                        (date.getFullYear() === today.getFullYear() &&
                            date.getMonth() === today.getMonth() &&
                            date.getDate() === today.getDate())
                    );
                })
                .sort((a, b) => new Date(a.reminder).getTime() - new Date(b.reminder).getTime());

            console.log(
                'reminders',
                reminders.map((i) => new Date(i.reminder).getTime())
            );
            res.status(200).send(reminders);
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
};
