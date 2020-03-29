const fs = require('fs')

/**
 * 使用方法： node miaov app -i
 * miaov：我们的脚本文件
 * app：要生成的项目的名称
 * -i：参数。表示要同时生成index.html文件
 */

// 获取项目要生成的项目名称，process
// console.log(process.argv)
const appName = process.argv[2];
// 当前脚本所在目录：__dirname
const appRoot = `${__dirname}/${appName}`;

// 根据项目名称来生成文件夹，如果文件夹已存在则不创建
try{
    if (fs.existsSync(appName)){
        console.log('this folder is exit, please do it again');
        process.exit(); //退出程序
    }
    // 创建外层项目文件夹，然后创建内部的图片，js，css文件夹
    fs.mkdirSync(appRoot)
    fs.mkdirSync(`${appRoot}/images`)
    fs.mkdirSync(`${appRoot}/js`)
    fs.mkdirSync(`${appRoot}/css`)

    if (process.argv.includes("-i")){
        // 将模板html写入到index.html中
        fs.writeFileSync(`${appRoot}/index.html`, `
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                欢迎来到miaovCli
            </body>
        </html>
        `)
    }
    console.log('the folders is created success');


}catch(err) {
    console.log(err)
}

