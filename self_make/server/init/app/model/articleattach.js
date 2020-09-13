module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const ArticleAttachSchema = new Schema({
        articleId: { type: String },
        content: { type: String },
        createTime: {
            type: Date,
            default: Date.now()
        }
    })

    // 创建模型对象
    return mongoose.model('ArticleAttach', ArticleAttachSchema)
}