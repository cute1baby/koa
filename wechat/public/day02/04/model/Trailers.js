// 热门电影模型对象
const mongoose = require('mongoose')
// 获取Schema
const Schema = mongoose.Schema

// 创建约束对象
const trailersSchema = new Schema({
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
    link: String, // 预告片地址
    releaseDate: String, //上映时间
    posterKey: String,  // 图片上传到七牛云，返回的key值 
    coverKey:String, // 上传七牛云，视频封面图链接（这个没有拿到）
    videoKey: String, //上传七牛云，试看视频链接（这个也没有拿到）
    createTime: {
        type: Date,
        default: Date.now()
    }
})

// 创建模型对象
const Trailers = mongoose.model('Trailers', trailersSchema)
module.exports = Trailers