// webpack是node写出来的，所以需要用他的语法
const path = require('path')
// console.log(path.resolve(__dirname + '/dist'));
module.exports = {
    devServer: { //服务器的配置
        host: 'localhost', // 设置服务器
        port: 8081, // 设置端口号，我之前设置了3000结果不生效（不知道什么原因）
        progress: true, // 显示进度
        historyApiFallback: true, // spa应用使用的是HTML5 History Api
        contentBase: path.resolve(__dirname, 'dist'), // 找当前目录下dist文件夹
        compress: true, //开启gzip压缩
        hot: true, // 热替换
        open: true  // 网站自动打开
    },
    mode: 'development',
    entry: './src/index.js', //入口
    output: {
        filename: 'bundle.js', // 打包后的文件名
        path: path.resolve(__dirname, 'dist'), // 指在当前目录下产生一个dist目录

    }
}