// webpack是node写出来的，所以需要用他的语法
const path = require('path')
// console.log(path.resolve(__dirname + '/dist'));
module.exports = {
    devServer: { //服务器的配置
        port: 3000, // 设置端口号
        progress: true, // 显示进度
        contentBase: './dist', // 找当前目录下dist文件夹
        compress: true
    },
    mode: 'development',
    entry: './src/index.js', //入口
    output: {
        filename: 'bundle.js', // 打包后的文件名
        path: path.resolve(__dirname, 'dist'), // 指在当前目录下产生一个dist目录

    }
}