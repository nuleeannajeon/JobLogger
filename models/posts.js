const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postsSchema = new Schema({
    company: {
        type: String,
        required: 'Please enter a name of the company!'
    },
    title: {
        type: String,
        required: 'Please enter a name of the position!'
    },
    salary: {
        type: Number
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String
    },
    postLInk: {
        type: String
    },
    location: {
        type: String
    },
    applied: {
        type: Boolean
    },
    appliedDate: {
        type: Date,
        default: Date.now
    },
    heardBack: {
        type: Boolean
    },
    heardBackDate: {
        type: Date,
        default: Date.now
    },
    interviewState: {
        type: String,
        enum: ['No Interview', 'Phone Interview', 'Onsite Interview'],
        required: function(){
            return this.heardBack = true
        }
    },
    interviewNote: {
        type: String
        // (This should be something we can add multiples of for levels of interview)
        //need help
    },
    companyContact: [
        { name: String },
        { email: String},
        { phone: Number },
        { position: String }
    ],
    savedApiLink :{
        type: String
    },
    reminder: {
        type: Date
    }
})


const Posts = mongoose.model("Posts", postsSchema);

module.exports = Posts;