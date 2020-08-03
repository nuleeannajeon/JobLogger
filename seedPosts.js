const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/joblogger';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const db = require('./models');

const testingPosts = [
    {
        company: 'Google',
        title: 'Junior Dev',
        postingType: 'wishlist',
        salary: 100000,
        notes: 'They reached out to me',
        postLink: 'www.google.ca',
        location: 'Toronto, ON',
        applied: false,
        // appliedData: 'none',
        heardBack: false,
        // heardBackDate: 'none'
        interviewState: 'No Interview',
        interviewNote: "Haven't interviewed yet",
        companyContact: [
            { name: 'Charlie', email: 'charlie@google.ca', phone: '416-111-1111', position: 'head of HR' },
        ],
    },
    {
        company: 'FaceTabs',
        title: 'Senior Dev',
        postingType: 'wishlist',
        salary: 100000,
        notes: 'They reached out to me',
        postLink: 'www.google.ca',
        location: 'Toronto, ON',
        applied: false,
        // appliedData: 'none',
        heardBack: false,
        // heardBackDate: 'none'
        interviewState: 'No Interview',
        interviewNote: "Haven't interviewed yet",
        companyContact: [
            { name: 'Charlie', email: 'charlie@google.ca', phone: '416-111-1111', position: 'head of HR' },
        ],
    },
    {
        company: 'Marcelin',
        title: 'Junior Dev',
        postingType: 'applied',
        salary: 100000,
        notes: 'They reached out to me',
        postLink: 'www.google.ca',
        location: 'Toronto, ON',
        applied: true,
        appliedData: '01/02/2020',
        heardBack: false,
        // heardBackDate: 'none'
        interviewState: 'No Interview',
        interviewNote: "Haven't interviewed yet",
        companyContact: [
            { name: 'Charlie', email: 'charlie@google.ca', phone: '416-111-1111', position: 'head of HR' },
        ],
    },
    {
        company: 'Marcelin',
        title: 'Junior Dev',
        postingType: 'interview',
        salary: 100000,
        notes: 'They reached out to me',
        postLink: 'www.google.ca',
        location: 'Toronto, ON',
        applied: true,
        appliedData: '01/02/2020',
        heardBack: true,
        heardBackDate: '02/02/2020',
        interviewState: 'Phone Interview',
        interviewNote: 'Had a nice call',
        companyContact: [
            { name: 'Charlie', email: 'charlie@google.ca', phone: '416-111-1111', position: 'head of HR' },
        ],
    },
    {
        company: 'United International',
        title: 'Junior Dev',
        postingType: 'offer',
        salary: 100000,
        notes: 'They offered me a decent salary',
        postLink: 'www.google.ca',
        location: 'Toronto, ON',
        applied: true,
        appliedData: '01/02/2020',
        heardBack: true,
        heardBackDate: '02/02/2020',
        interviewState: 'Phone Interview',
        interviewNote: 'Had a nice call',
        companyContact: [
            { name: 'Charlie', email: 'charlie@google.ca', phone: '416-111-1111', position: 'head of HR' },
        ],
    },
    {
        company: 'United International',
        title: 'Super Dev',
        postingType: 'rejected',
        salary: 100000,
        notes: 'They told me I suck',
        postLink: 'www.google.ca',
        location: 'Toronto, ON',
        applied: true,
        appliedData: '01/02/2020',
        heardBack: true,
        heardBackDate: '02/02/2020',
        interviewState: 'Phone Interview',
        interviewNote: 'Had a nice call',
        companyContact: [
            { name: 'Charlie', email: 'charlie@google.ca', phone: '416-111-1111', position: 'head of HR' },
        ],
    },
];

const main = async () => {
    const users = await db.UserData.find({});

    // for (let index = 0; index < users.length; index++) {
    //     const user = users[index];

    // }

    users.forEach(async (user) => {
        testingPosts.forEach(async (post) => {
            let newPost = await db.Posts.create(post);
            await db.UserData.findByIdAndUpdate({ _id: user._id }, { $push: { posts: newPost._id } });
        });
    });
};

main();
