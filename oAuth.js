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

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    const authenticateUser = async (email, password, done) => {
        const user = await User.findOne({ email });
        console.log(user);
        if (user === null) {
            return done(null, false, { message: 'No user with that email' });
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (err) {
            console.log('error in oAuth authentication check', err);
        }
    };

    callBackFunction = (accessToken, refreshToken, profile, callbackFunction) =>
        callbackFunction(null, profile, accessToken, refreshToken);

    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email',
            },
            authenticateUser
        )
    );
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
        console.log('oauth endpoint called upon', req);
        passport.authentication('linkedin')(req, res, next);
    });

    app.get(
        '/oauth/linkedin/callback',
        (req, res, next) => {
            console.log('linkedin callback called');
            passport.authenticate('linkedin')(req, res, next);
        },
        async ({ user: returnedUser }, res) => {
            const user = {
                username: returnedUser.displayName,
                thumbnail: req.returnedUser.photos[0].value,
                email: returnedUser.emails[0].value,
                authID: returnedUser.id,
            };
            await createSession(user);
        }
    );

};
