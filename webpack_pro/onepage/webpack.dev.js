const { smart } = require('webpack-merge')
const base = require('./webpack.base.js')

// 将基础配置和当前配置进行合并
module.exports = smart(base, {
    mode: 'development',
    optimization: {
        minimizer: [

        ]
    },
    plugins: [

    ]
})