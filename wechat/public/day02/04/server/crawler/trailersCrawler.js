const puppeteer = require('puppeteer')

module.exports = async () => {
// const run = async () => {
    // 爬取豆瓣热门电影信息
    const url = 'https://movie.douban.com/coming'
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
    // 一、爬取主要电影数据
    let result = await page.evaluate(() => {
        let list = []
        // 对加载好的页面进行dom操作
        let trDoms = $('.coming_list tbody tr')
        // 获取所有的即将上映电影
        for(let i=0;i<trDoms.length;i++){
            const $item = $(trDoms[i])
            const num = $item.children().last().html().trim()
            if(parseInt(num) > 1000){
                const href = $item.children().eq(1).find('a').attr('href')
                list.push(href)
            }
        }
        // 将爬取的数据返回
        return list
    })
    console.log('result=====', result)
    // 所有电影数据数组
    let moviesData = [] 

    // 二、爬取主要电影数据
    // 进入详情页爬取电影详情信息
    for(let i=0;i<result.length;i++){
        // 获取电影详情页的地址
        let url = result[i]
        await page.goto(url, {
            waitUntil: 'networkidle2'  //等待网络空闲时，再跳转加载页面
        });
        await timeout()
        let itemObj = await page.evaluate(() => {
            // 获取电影标题
            const title = $('[property="v:itemreviewed"]').html()
            // 导演
            const directors = $('[rel="v:directedBy"]').html()
            // 海报图
            const image = $('[rel="v:image"]').attr('src')
            const doubanId = $('.a_show_login.lnk-sharing').attr('share-id')
            // 演员(获取前3个)
            let casts = []
            const length =  $('[rel="v:starring"]').length > 3 ? 3 : $('[rel="v:starring"]').length
            for (let j = 0; j < length; j++) {
                const element = $('[rel="v:starring"]')[j].innerHTML
                casts.push(element)
            }
            // 上映时间
            const releaseDate = $('[property="v:initialReleaseDate"]').html()
            // 片长
            const duration = $('[property="v:runtime"]').html()
            // 评分
            const rating = $('[property="v:average"]').html()
            // 预告片电影的网址
            const href = $('.related-pic-video').attr('href')
            // 获取预告片电影封面图
            const cover = $('.related-pic-video').attr('background-image') || ''

            // 简介
            const summary = $('[property="v:summary"]').html().replace(/\s+/g, '')
            // 类型
            let tags = []
            let genrelist = $('[property="v:genre"]')
            for(let j=0;j<genrelist.length;j++){
                tags.push(genrelist[j].innerHTML)
            }
            return {
                title,
                directors,
                image,
                doubanId,
                casts: casts.join(' / '),
                releaseDate,
                duration,
                rating,
                href,
                cover,
                summary,
                tags
            }
        })
        
        moviesData.push(itemObj)
    }
    console.log('moviesData====', moviesData)
    // 三、预告片电影链接
    const moviesList = moviesData.map(item => {
        try {
            // 获取电影详情页的地址
            let url = item.href
            let linkUrl = ''
            // 预告片链接拿不到，先把代码注释掉
            // if(url){
            //     await page.goto(url, {
            //         waitUntil: 'networkidle2'  //等待网络空闲时，再跳转加载页面
            //     });
            //     await timeout()
            //     linkUrl = await page.evaluate(() => {
            //         // 获取电影标题
            //         return $('video>source').attr('src')
            //     })
            // }
            return {...item, link: linkUrl}
        } catch (error) {
            console.log('三、预告片电影链接出问题了')
        }
    })
    console.log('moviesList===', moviesList)

    // 5、关闭浏览器
    await browser.close();

    return moviesList
}

function timeout(){
    return new Promise(resolve => setTimeout(resolve, 2000))
}

