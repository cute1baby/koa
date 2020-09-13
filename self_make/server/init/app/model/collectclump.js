module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const CollectClumpSchema = new Schema({
        collectclumpId: { type: String },
        title: { type: String },
        articleNums: { type: Number },
        articleList: { type: Array },
        attentionNums: { type: Number },
        attentionList: { type: Array },
        creator: { type: String },
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
    return mongoose.model('CollectClump', CollectClumpSchema)
}