const passport = require('passport');
const session = require('express-session');
const User = require('./models/userLogin');
const { OAuth2Strategy: LinkedInStrategy } = require('passport-linkedin-oauth2');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = (app, baseURL, createSession) => {
    console.log('initializing authentication');

    app.use(session({ secret: process.env.SECRET, resave: true, saveUninitialized: true }));

    app.use(passport.initialize());

    // passport.serializeUser(function (user, done) {
    //     done(null, user._id);
    // });

    // passport.deserializeUser(function (id, done) {
    //     User.findById(id, function (err, user) {
    //         console.log("yes", user)
    //         done(err, user);
    //     });
    // });
    passport.serializeUser((user, cb) => cb(null, user));
    passport.deserializeUser((obj, cb) => cb(null, obj));

    // const authenticateUser = async (email, password, done) => {
    //     const user = await User.findOne({ email });
    //     console.log(user);
    //     if (user === null) {
    //         return done(null, false, { message: 'No user with that email' });
    //     }
    //     try {
    //         if (await bcrypt.compare(password, user.password)) {
    //             return done(null, user);
    //         } else {
    //             return done(null, false, { message: 'Password incorrect' });
    //         }
    //     } catch (err) {
    //         console.log('error in oAuth authentication check', err);
    //     }
    // };

    callBackFunction = (accessToken, refreshToken, profile, callbackFunction) =>
        callbackFunction(null, profile, accessToken, refreshToken);

    // passport.use(
    //     new LocalStrategy(
    //         {
    //             usernameField: 'email',
    //         },
    //         authenticateUser
    //     )
    // );

    passport.use(
        new LinkedInStrategy(
            {
                clientID: process.env.LINKEDIN_ID,
                clientSecret: process.env.LINKEDIN_SECRET,
                callbackURL: `${baseURL}/oauth/callback`,
                scope: ['r_emailaddress', 'r_liteprofile'],
            },
            callBackFunction
        )
    );

    app.get('/oauth/linkedin', (req, res, next) => {
        console.log('oauth endpoint called upon');
        passport.authenticate('linkedin')(req, res, next);
    });

    app.get(
        '/oauth/callback',
        (req, res, next) => {
            console.log('linkedin callback called');
            passport.authenticate('linkedin')(req, res, next);
        },
        async ({ user: returnedUser }, res) => {
            console.log('returned user from linkedin', returnedUser);
            const user = {
                name: returnedUser.displayName,
                thumbnail: returnedUser.photos[0] ? returnedUser.photos[0].value : '',
                email: returnedUser.emails[0] ? returnedUser.emails[0].value : '',
                authId: returnedUser.id,
                type: 'linkedin',
            };
            const sessionData = JSON.stringify(await createSession(user));
            res.send(
                `<html><body><script>window.opener.postMessage('${sessionData}', '*');</script>Please wait...</body></html>`
            );
        }
    );

    // local user creation
    app.post('/register', async ({ body }, res) => {
        //request needs username and password coming in to register
        const { email, password, name } = body;
        const user = {
            email,
            password,
            name,
            type: 'local',
        };
        try {
            const sessionData = await createSession(user);
            res.status(200).send(sessionData);
        } catch (err) {
            console.log('error occurred inside new user registration', err);
            res.status(400).send({ error: 'Something happened creating your user account, please try again' });
        }
    });

    app.post('/login', async ({ body }, res) => {
        const { email, password } = body;
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

        try {
            const sessionData = await createSession(user);
            res.status(200).send(sessionData);
        } catch (err) {
            console.log('error creating session for login', user);
            res.status(403).send({error: "Error creating new session"})
        }
    });

    app.get('/loginstatus', async ({headers}, res) => {
        try {

        const { session } = headers;
        const user = await User.findOne({ session });

        if (!user || session.length !== 36) {
            res.status(200).send({ loggedIn: false });
            return;
        }

        res.status(200).send({loggedIn: true, db_id: user.userDataId});
    } catch (err) {
        console.log("Error checking for logged in state", err)
        res.status(500).send({error: "Something has gone wrong checking the login state"})
    }

    });

    app.post('/logout', async ({ body }, req) => {
        const user = User.findOneAndUpdate({ session: body.session }, { session: '' });
        if (!user) {
            console.log('Logout attempted for null user');
        }
        req.status(200).send({ message: 'Successful logout' });
    });
};
