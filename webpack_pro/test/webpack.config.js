const path = require('path')
// html打包模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 文件进行划分
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css代码
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
// 压缩js代码
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname + '/dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: false,
            hash: true,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        })
    ],
    mode: 'production', // production | development
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                cache: false,
                parallel: true
            }),
            new OptimizeCss()
        ]
    }
}