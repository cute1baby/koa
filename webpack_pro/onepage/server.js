let app = require('express')();

const webpack = require('webpack');
// 中间件
let middle = require('webpack-dev-middleware')
let config = require('./webpack.config.js')
let compiler = webpack(config)
app.use(middle(compiler))

app.get('/user', (req,res) => {
    res.json({name: '珠峰架构'})
})
console.log('开启服务')
app.listen(3000)