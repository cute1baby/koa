const http = require('http')

const client = http.request({
    // tcp
    host: 'localhost',
    port: 80,

    // http
    protocol: 'http:',
    method: 'get',

    path: '/'
}, res => {
    res.on('data', data => {
        console.log('获取返回的数据', data.toString())
    })
    res.on('end', data => {
        console.log('数据全部返回')
    })
})

client.write('')
client.end()