const secured = require('../auth');
const User = require('../models/userLogin');

module.exports = (router) => {
    router.put('/api/user', async (req, res) => {
        const { session } = req.body;

        //a body will be sent along
        
        // update name

        // update
    });
};
