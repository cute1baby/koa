let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    // 多入口
    mode: 'development',
    entry: {
        home: './src/index.js',
        other: './src/other.js'
    },
    // 输出到dist文件夹下bundle.js文件
    output: {
        // [name]代表的是：home、other
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html', // 生成的文件名称
            chunks: ['home']  //表示index.html需要引入home.js文件
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'other.html',
            chunks: ['other', 'home']
        })
    ]
}