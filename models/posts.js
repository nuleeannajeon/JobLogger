const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postsSchema = new Schema({
    color: {
        type: String,
        enum: ['red', 'yellow', 'green', 'blue', 'purple', 'none']
        // TESTING COLORED BACKGROUND
    },
    company: {
        type: String,
        required: 'Please enter a name of the company!',
    },
    title: {
        type: String,
        required: 'Please enter a name of the position!',
    },
    postingType: {
        type: String,
        enum: ['wishlists', 'applied', 'interview', 'offer', 'reject']
    },
    salary: {
        type: Number,
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
    notes: {
        type: String,
    },
    postLink: {
        type: String,
    },
    location: {
        type: String,
    },
    applied: {
        type: Boolean,
    },
    appliedDate: {
        type: Date,
        // default: Date.now,
    },
    heardBack: {
        type: Boolean,
        default: false
    },
    heardBackDate: {
        type: Date,
        // default: Date.now,
    },
    interviewState: {
        type: String,
        enum: ['No Interview', 'Phone Interview', 'Onsite Interview', 'Email Interview']
        // default: this.hearBack=true
    },
    interviewNote: {
        type: String,
        // (This should be something we can add multiples of for levels of interview)
        //need help
    },
    companyContact: [{ name: String, email: String, phone: String, position: String }],
    savedApiLink: {
        type: String,
    },
    reminder: {
        type: Date,
    },
});

const Posts = mongoose.model('Posts', postsSchema);

module.exports = Posts;
