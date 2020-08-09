const secured = require('../auth');
// const User = require('../models/userLogin');
// const UserData = require('../models/userData');
const db = require('../models');

module.exports = (router) => {
    router.get('/api/contacts', secured, async ({ headers }, res) => {
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

            const posts = user.userData.posts
            const contacts = []

            posts.forEach(post => {
                post.companyContact.forEach(contact => {
                    contacts.push({
                        id: contact._id,
                        name: contact.name,
                        title: contact.title,
                        email: contact.email,
                        phone: contact.phone,
                        company: post.company,
                        postID: post._id
                    })
                })
            })

            res.status(200).send(contacts);
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: 'Something went wrong with the server' });
        }
    });
};
