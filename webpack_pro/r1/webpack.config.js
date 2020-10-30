const path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
const Webpack = require('webpack')
module.exports = {
    mode: 'development',   // development | production
    entry: './src/index.js',
    devServer: {
        port: 3000,
        open: true,
        contentBase: './dist'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        noParse: /jquery/,  //打包和运行时不去解析他的依赖关系
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: { // 用babel-loader，需要把es6转成es5
                        presets: [  // 预设
                            '@babel/preset-env',
                            "@babel/preset-react"
                        ]
                        // plugins: [
                        //     '@babel/plugin-proposal-class-properties',
                        //     '@babel/plugin-transform-runtime'
                        // ]
                    }
                },
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new Webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, 'dist', 'manifest.json')
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html' // 生成的文件名称
        }),
        new Webpack.IgnorePlugin(/\.\/locale/, /moment/)  // 忽略掉moment中的.locale文件
    ]
}