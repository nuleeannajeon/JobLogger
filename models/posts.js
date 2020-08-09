const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postsSchema = new Schema({
    color: {
        type: String,
        enum: ['red', 'yellow', 'green', 'blue', 'purple', 'none'],
        default: 'none'
    },
    company: {
        type: String,
        required: 'Please enter a name of the company!',
    },
    companyLogoImage: {
        type: String,
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
    // applied: {
    //     type: Boolean
    // },
    appliedDate: {
        type: Date,
        // default: Date.now,
    },
    // heardBack: {
    //     type: Boolean
    // },
    heardBackDate: {
        type: Date,
        // default: Date.now,
    },
    interviewState: {
        type: String,
        enum: ['emailInterview', 'phoneInterview', 'onsiteInterview']
        // default: this.hearBack=true
    },
    interviewNote: {
        type: String
    },
    companyContact: [{ name: String, email: String, phone: String, title: String }],
    savedApiLink: {
        type: String,
    },
    reminder: {
        type: Date,
    },
});

const Posts = mongoose.model('Posts', postsSchema);

module.exports = Posts;
