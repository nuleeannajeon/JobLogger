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
        salary: 10,
        interviewState: 'No Interview',
    });

    console.log(post);
    const dataRet = await UserData.findByIdAndUpdate(
        { _id: '5f245cc938eb8859a802eb16' },
        { $push: { posts: post._id } }
    );

    console.log(dataRet);
};

main();
