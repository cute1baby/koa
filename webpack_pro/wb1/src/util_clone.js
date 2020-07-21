require('@babel/polyfill')
export default function(str) {
    document.write(str);
}

class BModule {

}

// 迭代器语法
function *gen(params){
    yield 1;
}
console.log(gen().next());

// 这是es7语法，需要使用@babel/polyfill转成低阶语法
console.log('aaa'.includes('a'));