const theatersCrawler = require('./crawler/theatersCrawler')
const db = require('../db')
const saveTheaters = require('./save/saveTheaters')

// 初始化
const init = async () => {
    try {
        // 连接数据库
        await db
        // 爬取豆瓣数据
        const list = await theatersCrawler()
        // 将数据保存到数据库中
        await saveTheaters(list)
    } catch (error) {
        console.log('初始化数据库出错' + error)
    }
}

init()