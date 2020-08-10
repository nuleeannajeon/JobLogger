const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/joblogger';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const db = require('./models');

const testingPosts = [
    {
        company: 'Google',
        title: 'Junior Dev',
        postingType: 'wishlists',
        salary: 5000,
        notes: 'They reached out by email, I sent them my resume and I need to work on a cover letter',
        postLink: 'https://www.google.ca',
        location: 'Toronto, ON',
        // interviewState: 'No Interview',
        // interviewNote: "Haven't interviewed yet",
        companyContact: [
            {
                name: 'Charlie',
                title: 'Head of HR',
                email: "j@j.ca",
                phone: '415-444-4432',
            },
            {
                name: 'Fred',
                title: 'Team Lead',
                email: "j123@j.ca",
                phone: '415-233-4432',
            },
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
            await db.UserData.findByIdAndUpdate(
                { _id: user._id },
                { $push: { posts: newPost._id }, $inc: { totalPosts: 1 } }
            );
        });
    });
};
//         location: "Toronto, ON",
//         salary: 10,
//         postingType: 'wishlists',
//         interviewState: 'No Interview',
//     });

//     const posttwo = await Post.create({
//         company: 'Google',
//         title: 'Junior Dev',
//         location: "Montreal, ON",
//         salary: 10,
//         postingType: 'applied',
//         interviewState: 'No Interview',
//     });

//     const postthree = await Post.create({
//         company: 'Google',
//         title: 'Junior Dev',
//         location: "Ottawa, ON",
//         salary: 10,
//         postingType: 'interview',
//         interviewState: 'No Interview',
//     });

//     const postfour = await Post.create({
//         company: 'Google',
//         title: 'Junior Dev',
//         location: "Vancouver, ON",
//         salary: 10,
//         postingType: 'offer',
//         interviewState: 'No Interview',
//     });

//     const postfive = await Post.create({
//         company: 'Google',
//         title: 'Junior Dev',
//         location: "Halifax, ON",
//         salary: 10,
//         postingType: 'rejected',
//         interviewState: 'No Interview',
//     });

//     console.log('main -> post', post);

//     const dataRet = await UserData.findByIdAndUpdate(
//         { _id: '5f28565accceb11454514f0a' },
//         { $push: { posts: post._id } }
//     );
//     const dataRet2 = await UserData.findByIdAndUpdate(
//         { _id: '5f28565accceb11454514f0a' },
//         { $push: { posts: posttwo._id } }
//     );
//     const dataRet3 = await UserData.findByIdAndUpdate(
//         { _id: '5f28565accceb11454514f0a' },
//         { $push: { posts: postthree._id } }
//     );
//     const dataRet4 = await UserData.findByIdAndUpdate(
//         { _id: '5f28565accceb11454514f0a' },
//         { $push: { posts: postfour._id } }
//     );
//     const dataRet5 = await UserData.findByIdAndUpdate(
//         { _id: '5f28565accceb11454514f0a' },
//         { $push: { posts: postfive._id } }
//     );

//     console.log(dataRet);
//     const updatedData = await UserData.findById({ _id: '5f28565accceb11454514f0a' });
//     console.log("main -> updatedData", updatedData)
// };

main();
