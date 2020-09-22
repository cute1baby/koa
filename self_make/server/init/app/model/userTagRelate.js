module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    // 用户附加字段表
    const UserTagRelateSchema = new Schema({
        // rId: { type: Number },
        userId: { type: String },
        tagId: { type: String },
        isFocus: {
            type: Boolean,
            default: false
        },
        createTime: {
            type: Date,
            default: Date.now()
        }
    })

    // 创建模型对象
    return mongoose.model('UserTagRelate', UserTagRelateSchema)
}