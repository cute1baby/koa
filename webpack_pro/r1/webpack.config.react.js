let path = require('path')
let webpack = require('webpack')

module.exports = {
    entry: {
        // test: './src/test.js'
        react: ['react', 'react-dom']
    },
    output: {
        filename: '_dll_[name].js', // 产生的文件名
        path: path.resolve(__dirname, 'dist'),
        library: '_dll_[name]',  // 产生的文件函数名
        libraryTarget: 'commonjs', //打包后的模块化格式
    },
    plugins: [
        new webpack.DllPlugin({  // name === library
            name: '_dll_[name]',
            path: path.resolve(__dirname, 'dist', 'manifest.json')
        })
    ]
}