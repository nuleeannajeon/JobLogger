const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/joblogger';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const Post = require('./models/posts');

// posts = [
//     {company: "Google", title: "Junior Dev", salary: 10, interviewState: 'No Interview' },
//     {company: "LinkedIn", title: "Junior Dev", salary: 10, interviewState: 'No Interview' },
//     {company: "PageExchange", title: "Junior Dev", salary: 10, interviewState: 'No Interview' }
// ]

// Post.insertMany(posts)

const UserData = require('./models/userData');

// UserData.findByIdAndUpdate(
//     { _id: '5f245cc938eb8859a802eb16' },
//     { $push: { posts: '5f245a843d5e0f6110bf6f00'} }
// );

const main = async () => {
    // const user = await UserData.findById({_id: "5f245cc938eb8859a802eb16"})
    const post = await Post.create({
        company: 'Google',
        title: 'Junior Dev',
        location: "Toronto, ON",
        salary: 10,
        postingType: 'wishlist',
        interviewState: 'No Interview',
    });

    const posttwo = await Post.create({
        company: 'Google',
        title: 'Junior Dev',
        location: "Montreal, ON",
        salary: 10,
        postingType: 'applied',
        interviewState: 'No Interview',
    });

    const postthree = await Post.create({
        company: 'Google',
        title: 'Junior Dev',
        location: "Ottawa, ON",
        salary: 10,
        postingType: 'interview',
        interviewState: 'No Interview',
    });

    const postfour = await Post.create({
        company: 'Google',
        title: 'Junior Dev',
        location: "Vancouver, ON",
        salary: 10,
        postingType: 'offer',
        interviewState: 'No Interview',
    });

    const postfive = await Post.create({
        company: 'Google',
        title: 'Junior Dev',
        location: "Halifax, ON",
        salary: 10,
        postingType: 'rejected',
        interviewState: 'No Interview',
    });

    console.log('main -> post', post);

    const dataRet = await UserData.findByIdAndUpdate(
        { _id: '5f28565accceb11454514f0a' },
        { $push: { posts: post._id } }
    );
    const dataRet2 = await UserData.findByIdAndUpdate(
        { _id: '5f28565accceb11454514f0a' },
        { $push: { posts: posttwo._id } }
    );
    const dataRet3 = await UserData.findByIdAndUpdate(
        { _id: '5f28565accceb11454514f0a' },
        { $push: { posts: postthree._id } }
    );
    const dataRet4 = await UserData.findByIdAndUpdate(
        { _id: '5f28565accceb11454514f0a' },
        { $push: { posts: postfour._id } }
    );
    const dataRet5 = await UserData.findByIdAndUpdate(
        { _id: '5f28565accceb11454514f0a' },
        { $push: { posts: postfive._id } }
    );

    console.log(dataRet);
    const updatedData = await UserData.findById({ _id: '5f28565accceb11454514f0a' });
    console.log("main -> updatedData", updatedData)
};

main();
