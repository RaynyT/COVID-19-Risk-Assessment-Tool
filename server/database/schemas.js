const Schema = require('mongoose').Schema;

const forumSchema = new Schema({
    id: { type: Schema.Types.ObjectId, required: true, unique: true, auto: true },
    name: { type: String, required: true, unique: true },
    description: String,
    posts: {type: [{id: Number, posts: Object }]},
    createdAt: { type: Date, required: true },
    creator: {type:{id: Number, username: String, email: String }},
    editedAt: Date
})

const messageSchema = new Schema({
    id: { type: Schema.Types.ObjectId, required: true, unique: true, auto: true },
    forumID: { type: Schema.Types.ObjectId, required: true },
    body: {type: String, required: true },
    createdAt: { type: Date, required: true },
    creator: {type:{id: Number, username: String, email: String }},
    editedAt: Date
})

module.exports = { forumSchema, messageSchema }