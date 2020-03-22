/**
 * 做一个功能：服务端给客户端发一张图片，客户端把这张图片保存为1.png
 * http.ClientRequest 类
 *  new http.ClientRequest()
 *  http.request()
 */
const http = require('http')
const fs = require('fs')

// 创建一个客户端（能发http请求）的对象
// 请求行:    get http://127.0.0.1:80/ http/1.1
const client = http.request({
    // tcp
    host: 'www.baidu.com',
    port: 80,

    // http
    protocol: 'http:',
    method: 'get',

    path: '/img/bd_logo1.png'
}, res => {
    // 这个函数会在服务器响应的时候触发
    let content = new Buffer(0);
    // res => socket
    res.on('data', data => {
        // console.log(data.toString());
        // content += data.toString();

        content = Buffer.concat([content, data], content.length + data.length);

    });

    res.on('end', () => {
        fs.writeFileSync('./1.png', content);
    });
})

// 请求的发送需要调用下面的方法，如client.write('abc')，那么数据abc就会放到请求的body中。
client.write('');
// 用来告诉对方数据发送完成
client.end();