module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const UserSchema = new Schema({
        userId: { type: String },
        username: { type: String },
        password: { type: String },
        avatar: { type: String },
        company: {type: String},
        position: { type: String },
        selfIntroduction: { type: String },
        homepage: { type: String },
        type: {type: String},
        createTime: {
            type: Date,
            default: Date.now()
        }
    })

    // 创建模型对象
    return mongoose.model('User', UserSchema)
}