/**
 * @param x
 * 这里定义的参数类型是number，如果需要接收其他任意类型的参数，那么需要使用any，或者函数重载
 */
// function fn(x: number): number {
//     return x * 10
// }

// fn(10)

/**
 * 泛型
 *  很多时候类型是写死的，不利于复用
 *
 *  这样，我们就需要给类型这种值设置变量
 *  <类型变量名>，一般系统使用单字母大写，比如T,E,...
 *  写在函数名，参数列表之间，这是函数的
 */
function fn <T> (x: T): number {
    return Number(x) * 10
}

// 在函数调用的时候，同时给T赋值number类型，只要设置的类型和传参类型对应就可以。
fn<number>(1)
fn<string>('1')


/**
 * 传2个参数的泛型
 */
function fn1<T, S>(x: T, y: S): [T, S] {
    return [x, y]
}
let b = fn1<number, string>(10, 'abc')
console.log(b)


// 数组的表示方式
let arr1: number[] = []
let arr2: Array<number> = []
