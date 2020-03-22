const http = require('http')
const url = require('url')
const fs = require('fs')

const server = http.createServer()

// 存放html文件的目录
const HtmlDir = __dirname + '/src/';
// 监听端口
// server.on('listening', () => {
//     console.log('正在监听...')
// })

// 监听请求
server.on('request', (req, res) => {
    var urlStr = url.parse(req.url)
    switch (urlStr.pathname) {
        case '/':
            sendData(`${HtmlDir}/index.html`, req, res)
            break;

        case '/user':
            sendData(`${HtmlDir}/user.html`, req, res)
            break;
        default:
            sendData(`${HtmlDir}/404.html`, req, res)
            break;
    }
})

// 封装返回页面的函数，readFile读取数据内容
function sendData(filePath, req, res){
    fs.readFile(filePath, (err, data) => {
        // data返回的是buffer类型
        if(err){
            res.writeHead(404, 'ok', {
                'content-type': 'text/html;charset=utf-8'
            })
            res.end('<p>页面找不到...</p>')
        }else{
            res.writeHead(200, 'ok', {
                'content-type': 'text/html;charset=utf-8'
            })
            res.end(data)
            console.log(data)
        }
    })
}

server.listen(3000, 'localhost')