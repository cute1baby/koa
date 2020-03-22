/**
 * 服务器
 *      监听当前服务器上指定的ip与端口，如果有数据发送到ip和端口上，我就进行处理
 *
 * 创建一个Socket类，Socket就是用来处理网络数据的一个标准API对象
 * 通过Socket，我们就可以对网络数据进行读取和输出
 * dgram.Scoket
 */
const dgram = require('dgram');
const serverSocket = dgram.createSocket('udp4');  // udp4 => ipv4

serverSocket.on('listening', function(){
    console.log('服务器开启成功，等待数据...')
})

// 当接收到数据的时候触发
serverSocket.on('message', function (data) {
    console.log('接收到数据:' + data.toString())
})

/**
 * 监听指定的地址以及端口
 */
serverSocket.bind(12345, '127.0.0.1');

