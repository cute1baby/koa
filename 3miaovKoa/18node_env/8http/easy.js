const http = require('http')

const server = http.createServer()

// 监听端口
// server.on('listening', () => {
//     console.log('正在监听...')
// })

// 监听请求
server.on('request', (req, res) => {
    console.log('有客户正在发请求')
    // 通过setHeader设置自定义属性和writeHead设置效果一样，但是setHeader方法可以多次调用
    // res.setHeader('t_name', 'miaov')

    // 这个方法只能在当前请求中使用一次，并且在end之前调用一次
    // 'content-type': 'text/plain' 纯文本信息
    res.writeHead(200, 'ok', {
        'content-type': 'text/html;charset=utf-8',
        't_name': 'miaov'
    })
    res.write('hello')
    res.end();
})

server.listen(3000, 'localhost')