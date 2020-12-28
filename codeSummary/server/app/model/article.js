module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const ArticleSchema = new Schema({
        articleId: { type: String },  // 类型Id
        title: { type: String },
        desc: { type: String },
        address: { type: String },
        typeId: { type: String },
        picLink: { type: String },
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