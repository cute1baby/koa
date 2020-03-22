/**
 * 创建客户端与udp不同【客户端主动发给服务端】
 *  net.Socket类
 *
 *  1、new net.Server()
 *  2、net.createConnection()
 */

const net = require('net')
const fs = require('fs')
// 要连接的目标主机的地址以及端口号
const clientSocket = net.createConnection(12345, '127.0.0.1');

/**
 * clientSocket.remoteAddress  监听发送消息过来的IP
 * clientSocket.remotePort  监听发送消息过来的端口
 */
let content = new Buffer(0);  // 初始化一个Buffer对象
// 客户端监听数据传输, clientSocket就是一个socket对象
clientSocket.on('data', data => {
    // 客户端接收服务端发送的信息
    //console.log(data.toString(), clientSocket.remoteAddress, clientSocket.remotePort);
    content = Buffer.concat([content, data], content.length + data.length)

    // 客户端给服务端发送消息
    // clientSocket.write('我接受到服务端给我的信息了')
})


// 比如服务端发送一张很大的图片过来，然后它可能会做成几个数据包在clientSocket.on('data')回调中返回，
// 那么此时我们就需要对返回的Buffer数据拼接。

// 当数据包接收完成的时候触发
clientSocket.on('end', () => {
    console.log('所有数据包接收完成，就会执行这个回调');
    console.log(content)
    fs.writeFileSync('./1.png', content)
    // 把接收到的数据组合起来，然后通过fs写入到client文件夹中。此时需要注意的是我们
    // 接收到的数据是Buffer，需要将数据写入到文件
})