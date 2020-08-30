// 热门电影模型对象
const mongoose = require('mongoose')
// 获取Schema
const Schema = mongoose.Schema

// 创建约束对象
const theatersSchema = new Schema({
    title: String,
    rating: Number,
    duration: String,
    directors: String,
    casts: String,
    image: String,
    doubanId: { //这个特殊一点，设置唯一值
        type: Number,
        unique: true
    },
    tags: [String],
    summary: String,
    releaseDate: String, //上映时间
    posterKey: String,  // 图片上传到七牛云，返回的key值 
    createTime: {
        type: Date,
        default: Date.now()
    }
})

// 创建模型对象
const Theaters = mongoose.model('Theaters', theatersSchema)
module.exports = Theaters