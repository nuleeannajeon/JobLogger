const User = require('../models/userLogin');
const bcrypt = require('bcrypt');
const passport = require('passport')

module.exports = (router) => {
    router.post('/register', async ({ body }, res) => {
        //request needs username and password coming in to register
        const { email, password } = body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({
                email,
                password: hashedPassword,
            });
            // res.status(200).send({message: "Successful registration"});
            res.redirect('/login')
        } catch (err) {
            console.log('error occurred inside new user registration', err);
            res.status(400).send({message: "Something happened.  I don't know what, I just work here."});
        }
        console.log(await User.find());
    });

    router.post('/login', passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login'
    }))

};
