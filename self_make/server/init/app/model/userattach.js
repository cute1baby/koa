module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    // 用户附加字段表
    const UserAttachSchema = new Schema({
        userId: { type: String },
        likeNums: { type: Number },
        articleReadNums: { type: Number },
        attentionUsesList: { type: Array },
        followedUsesList: {type: Array},
        selfArticleList: { type: Array },
        articleCollectClumpList: { type: Array },
        attentionLabelList: { type: Array },
        createTime: {
            type: Date,
            default: Date.now()
        }
    })

    // 创建模型对象
    return mongoose.model('UserAttach', UserAttachSchema)
}