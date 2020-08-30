const puppeteer = require('puppeteer')

module.exports = async () => {
// const run = async () => {
    // 爬取豆瓣热门电影信息
    const url = 'https://movie.douban.com'
    // 1、打开浏览器
    const browser = await puppeteer.launch({
        // handless: false  //表示是否以无头浏览器的方式（指在后台打开，没有界面显示）打开
    });
    // 2、创建tab标签页
    const page = await browser.newPage();
    // 3、跳转到指定网址
    await page.goto(url, {
        waitUntil: 'networkidle2'  //等待网络空闲时，再跳转加载页面
    });
    // 4、等待网址加载完成，准备加载数据
    // 开启延时器，延时2秒后再开始爬取数据（预防网络不好的情况）
    await timeout()

    let result = await page.evaluate(() => {
        let list = []
        // 对加载好的页面进行dom操作
        let itemDoms = $('#screening .ui-slide-content .ui-slide-item')
        for(let i=0;i<8;i++){
            const $item = $(itemDoms[i])
            const title = $item.data('title')
            const rating = $item.data('rate')
            const duration = $item.data('duration')
            const directors = $item.data('director')
            const casts = $item.data('actors')
            const doubanId = $item.data('rater') //暂时把它当成豆瓣Id,设置唯一值
            const releaseDate = $item.data('release')  //上映时间（香港、大陆）270257

            // 详情页网址
            const href = $item.find('.poster > a').attr('href')
            // 海报图
            const image = $item.find('.poster>a>img').attr('src')
            list.push({
                doubanId,
                title,
                rating,
                duration,
                directors,
                casts,
                href,
                image,
                releaseDate
            })
        }
        // 将爬取的数据返回
        return list
    })

    // 进入详情页爬取电影详情信息
    for(let i=0;i<result.length;i++){
        let iResult = result[i]
        let url = iResult.href
        await page.goto(url, {
            waitUntil: 'networkidle2'  //等待网络空闲时，再跳转加载页面
        });
        // await timeout()
        let itemObj = await page.evaluate(() => {
            let tags = []
            const summary = $('[property="v:summary"]').html()
            let genrelist = $('[property="v:genre"]')
            for(let j=0;j<genrelist.length;j++){
                tags.push(genrelist[j].innerHTML)
            }
            return {
                summary,
                tags
            }
        })
        iResult.tags = itemObj.tags
        iResult.summary = itemObj.summary.replace(/\s+/g, '')
    }

    // 5、关闭浏览器
    await browser.close();

    return result
}

function timeout(){
    return new Promise(resolve => setTimeout(resolve, 2000))
}

