const User = require('../models/userLogin');
const bcrypt = require('bcrypt');
const passport = require('passport');
const uuid = require('uuid').v4;

module.exports = (router) => {
    router.post('/register', async ({ body }, res) => {
        console.log(body);
        //request needs username and password coming in to register
        const { email, password, name } = body;

        //Checking for duplicate
        const existingUser = await User.findOne({email})
        if (existingUser) {
            res.status(400).send({error: "User with that email exists"})
            return
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({
                email,
                password: hashedPassword,
                name
            });
            res.status(200).send({ message: 'Successful registration' });
        } catch (err) {
            console.log('error occurred inside new user registration', err);
            res.status(400).send({ message: "Something happened.  I don't know what, I just work here." });
        }
        console.log(await User.find());
    });

    router.post('/login', async ({ body }, res) => {
        const { email, password } = body;
        console.log('user input is', email, password);
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(403).send({ error: 'No user with that email' });
            return;
        }
        let validPassword;
        try {
            validPassword = await bcrypt.compare(password, user.password);
        } catch (err) {
            console.log('error inside login', err);
            res.status(403).send({ error: 'Error finding login' });
            return;
        }

        if (!validPassword) {
            res.status(403).send({ error: 'Invalid password' });
            return;
        }

        user.session = uuid();
        console.log('updating user with session id', user)
        await User.findOneAndUpdate({ _id: user._id }, { session: user.session });
        console.log('User successfully logged in!', user);
        res.status(200).send({  
            message: 'Successful login',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                thumbnail: user.thumbnail,
                session: user.session,
                createdAt: user.createdAt,
            },
        });
    });
    router.get('/loginstatus/:session', async ({params}, res) => {
        const {session} = params
        console.log('checking session id ', session)
        const user = await User.findOne({session})
        console.log('user', user)

        if (!user || session.length < 3) {
            res.status(403).send({error: "User is not logged in"})
            return
        }
        res.status(200).send(true)

    })

    router.post('/logout', async ({body}, req) => {
        const user = User.findOneAndUpdate({session: body.session}, {session: ''})
        if (!user) {
            console.log("Logout attempted for null user")
        }
        req.status(200).send({message: "Successful logout"})
    })
};
