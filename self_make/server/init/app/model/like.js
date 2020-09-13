module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const LikeSchema = new Schema({
        likeId: { type: String },
        articleId: { type: String },
        userId: { type: String },
        createTime: {
            type: Date,
            default: Date.now()
        }
    })

    // 创建模型对象
    return mongoose.model('Like', LikeSchema)
}