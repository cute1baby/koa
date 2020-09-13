module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const CommentSchema = new Schema({
        parentId: { type: String },
        articleId: { type: String },
        userId: { type: String },
        commentId: { type: String },
        content: { type: String },
        isDelete: { 
            type: Boolean, 
            default: false
        },
        isOnline: { 
            type: Boolean,
            default: true
        },
        updateTime: {
            type: Date
        },
        createTime: {
            type: Date,
            default: Date.now()
        }
    })

    // 创建模型对象
    return mongoose.model('Comment', CommentSchema)
}