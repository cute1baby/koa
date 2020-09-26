module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const ArticleSchema = new Schema({
        title: { type: String },
        articleId: { type: String },
        tagId: { type: String },  // 该文章从属于哪个tag
        userId: { type: String },
        likeNums: { type: Number },
        commentNums: {type: Number},
        readNums: { type: Number },
        isDelete: { 
            type: Boolean, 
            default: false
        },
        isOnline: { 
            type: Boolean,
            default: true
        },
        updateTime: {
            type: Date,
            default: Date.now()
        },
        createTime: {
            type: Date,
            default: Date.now()
        }
    })

    // 创建模型对象
    return mongoose.model('Article', ArticleSchema)
}