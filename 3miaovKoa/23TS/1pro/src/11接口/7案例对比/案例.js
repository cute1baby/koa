/**
 * 假如有这样一种情况，我在调用http的时候把参数method写成了methods,只有在执行代码的时候才能发现这个错误，
 * 但是我们现在想更早的发现这个问题，所以需要使用TS对其进行检测
 * @param {} options
 */
function http(options) {
    let options = Object.assign({
        method: 'get',
        url: '',
        isAsync: true
    }, options)
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open(options.method, options.url, options.isAsync)

        xhr.onload = function () {
            resolve(JSON.parse(xhr.responseText))
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
}).then(data => {

})