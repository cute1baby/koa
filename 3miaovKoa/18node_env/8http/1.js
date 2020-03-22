/**
 * 在地址栏中输入http://www.baidu.com到页面展示有哪些步骤
 * 1、用户通过浏览器发送一个http的请求到指定主机
 * 2、服务器接收到该请求，对该请求进行分析和处理
 * 3、服务器处理弯沉过之后，返回对应的数据到用户机器
 * 4、 浏览器接收服务器返回的数据，并根据接收到的进行分析和处理
 *
 * 客户端    服务端
 * 由客户端发送一个http请求到指定的服务端 => 服务端接收并处理请求 => 返回数据到客户端
 *
 *
 */

const http = require('http')
const url = require('url')

const server = http.createServer()

// 监听端口
server.on('listening', () => {
    console.log('正在监听...')
})

// 监听请求
server.on('request', (req, res) => {
    // req.url: 访问路径
    // ?后面的部分叫query string
    // console.log(req.url)
    var urlStr = url.parse(req.url)
    switch (urlStr.pathname) {
        case '/':
            res.writeHead(200, 'ok', {
                'content-type': 'text/html;charset=utf-8'
            })
            res.end('<h1>这是首页</h1>')
            break;

        case '/user':
            res.writeHead(200, 'ok', {
                'content-type': 'text/html;charset=utf-8'
            })
            res.end('<h1>这是用户页面</h1>')
            break;
        default:
            res.writeHead(404, 'ok', {
                'content-type': 'text/html;charset=utf-8'
            })
            res.end('<h1>页面找不到...</h1>')
            break;
    }
})

server.listen(3000, 'localhost')