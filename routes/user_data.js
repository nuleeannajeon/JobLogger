const secured = require("../auth")

module.exports = (router) => {
    router.get('/api/user/', secured, (req, res) => {
        console.log('success!')
        res.status(200).send({ message: 'Hi' });
    });
};
