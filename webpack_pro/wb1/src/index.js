import util from './util';
var str1 = 'hello,欢迎来到webpack的世界!'
document.write(str1 + '我是主文件');
setTimeout(function(){
    util(str1 + '我是依赖文件')
}, 3000);