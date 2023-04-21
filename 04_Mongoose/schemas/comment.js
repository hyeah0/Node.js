const mongoose = require('mongoose');

const { Schema } = mongoose;
const{ Types: { ObjectId }} = Schema;
const commentSchema = new Schema({
    commenter: {
        type: ObjectId,
        require: true,
        ref: 'User',    // User 컬렉션 조인 User._id
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Comment', commentSchema);