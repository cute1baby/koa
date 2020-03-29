
/**
 * ls
 * 输出当前运行命令所在的目录下的文件和文件夹  (node ls)
 * 指定显示的目录：(node ls -p d:)
 * 注意：当commander版本为^2.17.1，commander.action的参数path则是有效的；其他版本不一定
*/
const commander = require('commander');
// 加载fs模块
const fs = require('fs');
const chalk = require('chalk');

// 设置版本
commander.version('v1.0.0', '-v, --version')
// 设置命令选项，默认值是当前目录
commander.option('-p, --path [val]', '设置要显示的目录', __dirname);

// 设置列表选项，给文件夹和文件进行分类，不设默认值。没有默认值默认返回true
commander.option('-l, --list', '设置列表显示')

// 实现命令的具体逻辑
commander.action(() => {
    // option中的变量会挂在当前commander对象的同名属性下
    console.log('ls', commander.path)

    // 把当前目录下的文件和文件夹显示在控制台中
    try{
        const files = fs.readdirSync(commander.path)
        console.log('>>>>>', files);
        // 没有默认值，默认是true
        if (commander.list){
            const fileList = files.map((item, index) => {
                // 获取文件的扩展信息
                const stat = fs.statSync(commander.path + '/' + item)
                return stat.isDirectory() ? chalk.blue(`${index + 1} [文件夹] ${item}\r\n`) : chalk.red(`${index + 1} [文件] ${item}\r\n`);
            }).join('')
            console.log(fileList)
        }else{
            console.log(files)
        }


    }catch(err){
        console.log("=====》》", err)
    }
})

// 在把process.argv交给parse解析之前，如果文件数组的长度小于3，那么将当前文件夹插入到数组中
if (process.argv.length < 3){
    process.argv.push(__dirname)
}
commander.parse(process.argv)