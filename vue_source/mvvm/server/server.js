const http = require('http');
const route = require('./route.js');
const {port} = require('./config.js');

const server = http.createServer((req, res)=>{
	route(req, res);
});

server.listen(port, () => {
    console.log(`服务启动，在浏览器打开：localhost:${port}`)
});