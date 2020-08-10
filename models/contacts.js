const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    title: {
        type: String,
    },
    contactMethods: [{ method: {type: String, enum: ['email', 'phone']}, detail: String }],
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
