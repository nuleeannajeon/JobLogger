const secured = require('../auth');
const User = require('../models/userLogin');
const UserData = require('../models/userData');

module.exports = (router) => {
    router.get('/api/posts', secured, async (req, res) => {
        try {
            const { session } = headers;
            const user = await User.findOne({ session });

            if (!user) {
                console.log("This shouldn't happen, but an authenticated user has no data?");
                res.status(400).send({ error: 'No user found' });
                return;
            }

            const userDataPosts = UserData.findOne({_id: user.userData}).populate('posts')

            
            res.status(200).send({ message: changedMessage });
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

            


    //         res.status(200).send({ message: changedMessage });
    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).send({ error: 'Something went wrong with the server' });
    //     }
    // });
};
