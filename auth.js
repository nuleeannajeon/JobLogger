const User = require('./models/userLogin');
// middleware called upon to secure authenticated routes
module.exports = async ({ headers }, res, next) => {
    console.log('middleware called upon to check secured route', headers);
    if (!headers.session || !(await User.findOne({ session: headers.session }))) {
        console.log('Insecure attempt on secured route')
        res.status(403).send({ error: 'Access to this route requires authentication' });
    }
};
