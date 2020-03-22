const http = require('http')

const server = http.createServer()

server.on('request', (req,res) => {
    console.log(req.url);
    switch (req.url) {
        case '/':
            res.writeHead(200, 'ok', {
                'Content-Type': 'text/html;charset=utf8'
            });
            res.write('首页')
            break;
        case '/list':
            res.writeHead(200, 'ok', {
                'Content-Type': 'text/html;charset=utf8'
            });
            res.write('列表页')
            break;
        case '/view':
            res.writeHead(200, 'ok', {
                'Content-Type': 'text/html;charset=utf8'
            });
            res.write('视图页')
            break;
        case '/cong':
            res.writeHead(301, http.STATUS_CODES[301], {
                'Content-Type': 'text/html;charset=utf8',
                // 重定向地址
                'Location': 'http://www.baidu.com'
            });
            res.write('视图页')
            break;
        default:
            res.writeHead(404, http.STATUS_CODES[404], {
                'Content-Type': 'text/html;charset=utf8'
            });
            res.write('找不到页面')
            break;
    }
})

server.listen(80, '127.0.0.1');