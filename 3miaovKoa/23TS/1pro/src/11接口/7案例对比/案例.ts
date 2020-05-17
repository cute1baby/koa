/**
 * 定义了HttpOptions和HttpResponseData的数据结构，使得在调用的时候能直接检测出他是否书写正确。
 * 比如下面我把method写成了methods，TS检查出来了，那代码就能在执行之前就修改过来了
 */
interface HttpOptions {
    method: string,
    url: string,
    isAsync: true
}

interface HttpResponseData {
    code: number,
    data: any
}

function http(options: HttpOptions) {
    let opts = Object.assign({
        method: 'get',
        url: '',
        isAsync: true
    }, options)
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open(opts.method, opts.url, opts.isAsync)

        xhr.onload = function () {
            let data: HttpResponseData = JSON.parse(xhr.responseText)
            resolve(data)
        }

        xhr.onerror = function () {
            reject({
                code: xhr.response.code,
                message: '出错了'
            })
        }

        xhr.send()

    })
}


http({
    methods: 'get',
    url: '..bundleRenderer.renderToStream',
    isAsync: true
}).then((res: HttpResponseData)  => {
    console.log(res.code, res.data)
})