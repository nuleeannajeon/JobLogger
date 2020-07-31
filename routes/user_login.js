const secured = require('../auth');
const User = require('../models/userLogin');
const bcrypt = require('bcrypt');

module.exports = (router) => {
    router.put('/api/user', async (req, res) => {
        const { session } = req.headers;

        const user = await User.findOne({ session });

        if (!user) {
            console.log('Somehow an authenticated route was accessed by an inauthenticated user?');
            res.status(400).send({ error: 'Server error' });
            return;
        }

        const { email, currentPassword, newPassword, name } = req.body;

        if (currentPassword && newPassword) {
            const validPassword = await bcrypt.compare(currentPassword, user.password);

            if (!validPassword) {
                res.status(401).send({ error: 'Incorrect current password' });
                return;
            }

            const hashedPass = await bcrypt.hash(newPassword, 10);
            await User.findByIdAndUpdate({ _id: user._id }, { password: hashedPass });

            res.status(200).send({ message: 'Password successfully updated' });
            return;
        }

        res.status(400).send({ error: 'No data sent' });
    });
};
