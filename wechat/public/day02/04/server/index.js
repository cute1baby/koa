const theatersCrawler = require('./crawler/theatersCrawler')
const trailersCrawler = require('./crawler/trailersCrawler')
const db = require('../db')
const saveTheaters = require('./save/saveTheaters')
const saveTrailers = require('./save/saveTrailers')
const qiniuUpload = require('./qiniu')
// 初始化
const init = async () => {
    try {
        // 连接数据库
        await db
        // 爬取豆瓣数据
        // const list = await theatersCrawler()
        const list = await trailersCrawler()
        // 将数据保存到数据库中
        // await saveTheaters(list)
        await saveTrailers(list)
        // await qiniuUpload()
    } catch (error) {
        console.log('初始化数据库出错' + error)
    }
}

init()