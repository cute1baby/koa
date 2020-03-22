const http = require('http')
/**
 * http.Server 类
 *  new http.Server()
 *  http.createServer()
 */

const server = http.createServer()

server.on('request', (data) => {
    // 接收到了请求
    console.log('获得了你的请求', data)
})

// 80 默认，约定  给  HTTP 使用(监听通配IP)
server.listen(80, '0.0.0.0');