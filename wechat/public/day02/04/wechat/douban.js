const rp = require('request-promise-native')
const baseUrl = 'http://t.yushu.im/'

const moviesSearch = (searchName) => {
    searchName = encodeURI(searchName)
    const url = `${baseUrl}v2/movie/search?q=${searchName}&count=8`
    return new Promise((resolve, reject) => {
        rp({
            method: 'GET',
            url,
            json: true
        })
        .then(res => {
            console.log('res====', res)
            resolve(res)
        })
        .catch(err => {
            console.log('moviesSearch接口出现错误', err)
            reject('moviesSearch接口出现错误'+ err)
        })
    })
}

module.exports = {
    moviesSearch
}