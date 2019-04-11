const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ChatSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    messages: [{
        message: {
            type: String,
            required: true
        },
        meta: [{
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            delivered: Boolean,
            read: Boolean
        }]
    }],

});

module.exports = Chat = mongoose.model('chat', ChatSchema);