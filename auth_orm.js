const User = require('./models/userLogin');

module.exports = {
    registerUser: async (user, session) => {
        console.log("REGISTERING USER ", user)
        if (!user || !session) {
            console.log('No user or no session id');
            return { message: 'Invalid user data' };
        }

        //Checking if this person has logged in before with oauth, updating if so
        const existingUser = await User.findOne({ authId: user.authId });
        let newUser;
        if (existingUser && existingUser._id) {
            console.log('User has previously logged in, saving new session', user, existingUser);
            newUser = await User.findByIdAndUpdate({ _id: existingUser._id }, { session });
            return {
                message: 'Welcome back',
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                thumbnail: newUser.thumbnail,
                session,
                createdAt: newUser.createdAt,
            };
        }

        //New user, add to DB
        newUser = await User.create({
            authId: user.authId,
            email: user.email,
            name: user.username,
            thumbnail: user.thumbnail,
            session,
        });
        return {
            message: 'Welcome!',
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            thumbnail: newUser.thumbnail,
            session,
            createdAt: newUser.createdAt,
        };
    },
};
