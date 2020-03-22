/**
 * 在node中tcp协议，基于net模块来实现
 * 创建一个服务器
 *  1、监听地址以及端口
 *  2、处理发送到当前坚挺地址以及端口的数据
 *  3、返回数据到连接的客户端
 *  net.Server类别
 *      new net.Server()
 *      net.createServer()  => return new net.Server
 */
const net = require('net')
const fs = require('fs')
const server = net.createServer(() => {
    // 这个函数其实就是connection事件绑定的函数，即把下面的server.on('connection')回调函数写在这里也行

})

const fileImg = fs.readFileSync('./images/bg.png')

// 当有客户端连接的时候触发
server.on('connection', (socket) => {
    // socket => 即当前连接的socket对象
    console.log('有人连接了')

    // 服务端像客户端打招呼,并且发送一张图片过去
    socket.write(fileImg)

    // 表示结束发送
    socket.end();
    // 服务端接收客户端发来的消息
    socket.on('data', (data) => {
        console.log(data.toString());
        // socket.write('我又给你回复了')
    })
})

/**
 * 监听地址及端口
 */
// server.listen(12345, '127.0.0.1');

// 0.0.0.0：相当于(*)通配
server.listen(12345, '0.0.0.0');

