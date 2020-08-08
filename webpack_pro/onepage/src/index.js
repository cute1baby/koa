import 'bootstrap'
import './style'

console.log('index');
/**
 * 这个是用来验证报错之后提示devtool功能的
 */
// console.log(a);

console.log('111');
/**
 * 现在有个问题：
 *  本地启的页面服务是webpack-dev-server的8081端口，
 *  但是express启动的是3000端口，所以存在跨域的问题
 */

// 创建xhr对象
const xhr = new XMLHttpRequest()

// http-proxy
xhr.open('GET', '/user', true);
xhr.onload = function(){
    console.log('这是输出的数据===>>>>>>', xhr.response)
}
xhr.send()