module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const AtypesSchema = new Schema({
        title: { type: String },
        typeId: { type: String },  // 类型Id
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
    return mongoose.model('Atypes', AtypesSchema)
}