const http = require('http')
const fs = require('fs')
// 通过判断文件类型返回content-type对应的值
const mime = require('mime')
// 假设这是后端拿到的数据
let users = [
    { id: 1, name: '李钟', age: 19 },
    { id: 2, name: '萧然', age: 16 },
    { id: 3, name: '自如', age: 24 }
]
// 创建一个服务器
const app = http.createServer((req,res) => {
    res.writeHead(200, http.STATUS_CODES[200], {
        'Content-Type': 'text/html;charset=utf-8'
    });
    console.log(">>>>>>res.url", req.url);
    if (req.url.startsWith('/static')){
        getStaticData(__dirname + req.url)
    }else{
        switch (req.url) {
            case '/getUser':
                const base = users.map( user => user.name);
                res.end(JSON.stringify(base))
                break;

            default:
                res.end('404')
                break;
        }
    }



    // 返回静态数据给客户端
    function getStaticData(path, code = 200, desc = { 'Content-Type': 'text/html;charset=utf-8' }) {
        if (fs.existsSync(path)) {

            // 判断文件的类型
            const fileType = path.slice(path.lastIndexOf(".") + 1)
            if (!fileType){
                desc = 'txt'
            }
            desc['Content-Type'] = mime.getType(fileType);

            res.writeHead(code, http.STATUS_CODES[code], desc);
            const content = fs.readFileSync(path)
            res.end(content)
        } else {
            getStaticData(__dirname + '/static/404.html', '404')
        }
    }



})



// app.listen(80, '127.0.0.1')   跟下面同理
app.listen(80, () => {
    console.log('服务器创建成功')
})