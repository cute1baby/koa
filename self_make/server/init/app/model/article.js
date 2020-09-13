module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const ArticleSchema = new Schema({
        title: { type: String },
        articleId: { type: String },
        userId: { type: String },
        likeNums: { type: String },
        commentNums: {type: String},
        readNums: { type: String },
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
    return mongoose.model('Article', ArticleSchema)
}