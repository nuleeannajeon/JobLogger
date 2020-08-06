const User = require('./models/userLogin');
const UserData = require('./models/userData');
const bcrypt = require('bcrypt');

module.exports = {
    registerUser: async (user, session) => {
        console.log('REGISTERING USER ', user);

        if (!user || !session || session.length !== 36) {
            console.log('No user or no session id', user, session);
            return { error: 'Invalid user data for registration' };
        }

        let newUser;
        let existingUser;
        //Route for linkedin login
        if (user.type === 'linkedin') {
            existingUser = await User.findOne({ authId: user.authId }).populate('userData');
        } else {
            // local user login
            existingUser = await User.findOne({ email: user.email }).populate('userData');
        }
        console.log('existingUser', existingUser);

        if (existingUser && existingUser._id) {
            console.log('User has previously logged in, saving new session', user, existingUser);
            newUser = await User.findByIdAndUpdate({ _id: existingUser._id }, { session }).populate('userData');
            console.log('newUser', newUser);
            return {
                message: 'Welcome back ' + existingUser.userData.name,
                db_id: newUser.userDataId,
                id: newUser._id,
                name: newUser.userData.name,
                email: newUser.email,
                thumbnail: newUser.thumbnail,
                session,
                createdAt: newUser.createdAt,
            };
        }

        newUserLoginData = {
            email: user.email,
            session,
        };
        newUserDataData = { name: user.name };
        if (user.location) newUserDataData.location = user.location;
        if (user.school) newUserDataData.school = user.school;
        if (user.portfolioLink) newUserDataData.portfolioLink = user.portfolioLink;

        if (!user.type || user.type === 'local') {
            newUserLoginData.password = await bcrypt.hash(user.password, 10);
            // newUserData.name = user.name;
            newUserLoginData.type = 'local';
        } else if (user.type === 'linkedin') {
            newUserLoginData.authId = user.authId;
            newUserLoginData.type = user.type;
            newUserLoginData.thumbnail = user.thumbnail;
            // newUserData.name = user.name;
        }

        try {
            //New user, add to DB
            newUser = await User.create(newUserLoginData);
            newUserDataObject = await UserData.create({
                userLogin: newUser._id,
                ...newUserDataData,
            });
            await User.findByIdAndUpdate({ _id: newUser._id }, { userData: newUserDataObject._id });
        } catch (err) {
            console.log('there was an error creating the new user', err);
            return { error: 'Error creating user' };
        }
        return {
            message: `Welcome ${newUserDataObject.name}!`,
            session: newUser.session
        };
    },
};
