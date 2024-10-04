const commentsSchema=new Schema({
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
},{timestamps:true})

module.exports = model('Comment', commentsSchema)