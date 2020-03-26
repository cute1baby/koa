
/**
 * ls
 * 输出当前运行命令所在的目录下的文件和文件夹  (node index)
 * 指定显示的目录：(node index d:)
 * 注意：当commander版本为^2.17.1，commander.action的参数path则是有效的；其他版本不一定
*/
const commander = require('commander');
// 加载fs模块
const fs = require('fs');

// 设置版本
commander.version('v1.0.0', '-v, --version')

// 如果增加子命令，那么最少要让process.argv数组长度是3
const subCommander = commander.command('<path>')

// 实现命令的具体逻辑
commander.action((path) => {
    // path是用户在命令中定义的<path>
    // console.log('ls', path)
    // 把当前目录下的文件和文件夹显示在控制台中
    try{
        const files = fs.readdirSync(path)
        console.log(files)


    }catch(err){
        console.log("=====》》", err)
    }
})

// 在把process.argv交给parse解析之前，如果文件数组的长度小于3，那么将当前文件夹插入到数组中
if (process.argv.length < 3){
    process.argv.push(__dirname)
}

commander.parse(process.argv)