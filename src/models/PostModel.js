const { Schema } = require("mongoose");

const postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
},{timestamps:true})

module.exports = model('Post', postSchema)