// webpack是node写出来的，所以需要用他的语法
const path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Webpack = require('webpack');
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
    mode: 'production',  //development, production
    entry: './src/index.js', //入口
    output: {
        filename: 'bundle.js', // 打包后的文件名
        path: path.resolve(__dirname, 'dist'), // 指在当前目录下产生一个dist目录
    },
    optimization: { // 优化项
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                cache: false,
                parallel: true
            }),
            new OptimizeCss()
        ]
    },
    plugins: [ //数组，放所有的webpack插件
        new HtmlWebpackPlugin({
            template: './src/index.html',  // 模板入口文件地址
            filename: 'index.html',  // 模板出口文件地址
            minify: {
                removeAttributeQuotes: true,  //去除引号
                collapseWhitespace: true,  //清除空格和换行

            },
            hash: true,  // 增加引入文件的hash戳
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'  //抽离出来的css名字叫main.css
        }),
        new Webpack.ProvidePlugin({  // 在每个模块中都注入$
            $: 'jquery'
        })
    ],
    module: {  // 模块
        rules: [ // 规则
            {
                test: require.resolve("jquery"),
                use: "expose-loader?$"
            },
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'eslint-loader',
            //         options: {
            //             enforce: 'pre'  //设置这个属性即表示把这个loader的执行顺序提前
            //         }
            //     }
            // },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: { // 用babel-loader，需要把es6转成es5
                        presets: [  // 预设
                            '@babel/preset-env'
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                },
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
            { test: /\.css$/, use:
                [
                    MiniCssExtractPlugin.loader,  //这个代替style-loader的配置
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/, use:
                    [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'less-loader'
                    ]
            },
        ]
    }
}








