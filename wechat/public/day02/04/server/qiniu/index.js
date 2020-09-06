const Theaters = require('../../model/Theaters')
const upload = require('./upload')
// 生成唯一key方法
const nanoid = require('nanoid')

/**
 * 将数据库中的图片上传到七牛云服务器
 */
module.exports = async () => {
/**
 * 1、获取数据库中的图片链接
 * 2、上传到七牛
 * 3、保存key到数据库中
 */
    // 查找posterKey为空或者不存在的值
    const movies = await Theaters.find({$or: [
            {posterKey: ''},
            {posterKey: null},
            {posterKey: {$exists: false}}
        ]}
    )
    console.log(movies)

    for(let i=0;i<movies.length;i++){
        let movie = movies[i]
        // 上传到七牛中
        const url = movie.image
        const key = `${nanoid(10)}.jpg`
        await upload(url, key)
        movie.posterKey = key
        movie.save()
    }
}