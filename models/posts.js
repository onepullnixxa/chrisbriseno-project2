const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true},
    author: String,
    img: { type: String, required: true },
    contentText: { type: String, required: true },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;