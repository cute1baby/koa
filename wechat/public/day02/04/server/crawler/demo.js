const puppeteer = require('puppeteer');

// 测试文件
(async () => {
    const url = 'https://movie.douban.com'
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle2'});
    await timeout()

    const result = await page.evaluate(() => {
        let list = [1, 2, 3]
        return list
    })
    console.log('=====result', result)

    await browser.close();
})();

function timeout(){
    return new Promise(resolve => setTimeout(resolve, 2000))
}