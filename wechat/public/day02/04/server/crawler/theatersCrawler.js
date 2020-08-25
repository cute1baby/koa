const puppeteer = require('puppeteer')

// 爬取豆瓣热门电影信息
const url = 'https://movie.douban.com/explore#!type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0'

module.exports = async () => {
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

    const result = await page.evaluate(() => {
        let list = []
        // 对加载好的页面进行dom操作
        // const $itemList = $('#wrapper>.list>.item')
        // for(let i=0;i<8;i++){
        //     const $item = $itemList[i];
        //     const id = $item.data('id')
        //     const url = $item.attr('href')
        //     const poster =  $item.find('img').attr('src')
        //     const title = $item.find('img').attr('alt')
        //     const score = $item.find('strong').html()
        //     list.push({
        //         id,
        //         url,
        //         poster,
        //         title,
        //         score
        //     })
        // }
        // 将爬取的数据返回
        return list
    })
    console.log('=====result', result)
    // 5、关闭浏览器
    await browser.close();
}

function timeout(){
    return new Promise(resolve => setTimeout(resolve, 2000))
}
