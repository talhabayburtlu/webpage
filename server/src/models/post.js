const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    blocks: {
        type: Array,
        required: true,
    },
    entityMap: {
        type: Array,
        required: true,
    },
    breadcrumbs: [{
        type: String,
        trim: true,
    }]
}, {timestamps: true});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;