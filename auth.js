const User = require('./models/userLogin');
//middleware called upon to secure authenticated routes
// module.exports = async ({ headers }, res, next) => {
//     console.log('middleware called upon to check secured route', headers);
//     if (!headers.session || !(await User.findOne({ session: headers.session }))) {
//         res.status(403).send({ error: 'Access to this route requires authentication' });
//     }
// };

module.exports = async({user}, res, next) => {
    if (user) {
        next()
    } else {
        console.log('secure route access attempted with no user', user)
        // res.status(403).send({message: "Access denied without login"})
        res.redirect('/login')
    }
}