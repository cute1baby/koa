module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const LikeSchema = new Schema({
        articleId: { type: String },
        userId: { type: String },
        isLike: {
            type: Boolean,
            default: false
        },
        createTime: {
            type: Date,
            default: Date.now()
        }
    })

    // 创建模型对象
    return mongoose.model('Like', LikeSchema)
}