module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const TagSchema = new Schema({
        tagId: { type: String },
        themeColor: {type: String},  // 主题颜色
        tagIcon: {type: String},  // 标签图标
        title: { type: String },  // 标题
        articleNums: { type: Number },  // 文章数量
        articleList: { type: Array },  //文章列表
        attentionNums: { type: Number },  // 关注人数
        attentionList: { type: Array },  //关注人列表
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