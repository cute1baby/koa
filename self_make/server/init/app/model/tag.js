module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const TagSchema = new Schema({
        tagId: { type: String },
        title: { type: String },
        articleNums: { type: Number },
        articleList: { type: Array },
        attentionNums: { type: Number },
        attentionList: { type: Array },
        isDelete: { 
            type: Boolean,
            default: false
        },
        createTime: {
            type: Date,
            default: Date.now()
        }
    })

    // 创建模型对象
    return mongoose.model('Tag', TagSchema)
}