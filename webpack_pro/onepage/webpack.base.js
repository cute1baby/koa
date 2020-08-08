let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let { CleanWebpackPlugin } = require('clean-webpack-plugin')
// let CopyWebpackPlugin = require('copy-webpack-plugin')
const Webpack = require('webpack');

module.exports = {
    // 但也应用入口
    // mode: 'production',  //development, production
    entry: {
        home: './src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/, use: ['style-loader', 'css-loader']
            }
        ]
    },
    // devtool: 'source-map',  //增加映射文件，调试源代码
    devtool: 'eval-source-map',  // 不会产生单独的文件，能够显示行和列
    watch: true,
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 500,
        ignored: /node_modules/
    },
    output: {
        // [name]代表的是：home、other
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html' // 生成的文件名称
        }),
        new CleanWebpackPlugin(),
        // new CopyPlugin({
        //     patterns: [
        //         { from: 'doc', to: 'dist' }
        //     ],
        // })
        new Webpack.BannerPlugin('make by lizhog')
    ],
    devServer: { //服务器的配置
        host: 'localhost', // 设置服务器
        port: 8081, // 设置端口号，我之前设置了3000结果不生效（不知道什么原因）
        progress: true, // 显示进度
        historyApiFallback: true, // spa应用使用的是HTML5 History Api
        contentBase: path.resolve(__dirname, 'dist'), // 找当前目录下dist文件夹
        compress: true, //开启gzip压缩
        hot: true, // 热替换
        open: true,  // 网站自动打开

        // 第一种写法，代理服务器
        // proxy: {
        //     '/api': {
        //         target: 'http://localhost:3000',  //用重写的方式配置了一个代理
        //         pathRewrite: {
        //             '/api': ''
        //         }
        //     }
        // }

        // 第二种写法，mock数据
        before(app) {
            app.get('/user', (req, res) => {
                res.json({ name: '珠峰架构111' })
            })
        }
    },
    performance:{
        hints: 'warning',
        maxAssetSize: 300000, // 整数类型（以字节为单位）
        maxEntrypointSize: 500000 // 整数类型（以字节为单位）
    },
    resolve: {
        modules: [path.resolve('node_modules')],  //表示去node_modules模块中找第三方包
        alias: {  // 设置别名
            bootstrap: 'bootstrap/dist/css/bootstrap.css',
        },
        mainFields: ['style', 'main'], // 设置解析文件的顺序
        // mainFiles: [], // 入口文件的名字
        extensions: ['.js', '.css', '.json', '.vue']  //省略后缀时找文件的顺序
    }
}