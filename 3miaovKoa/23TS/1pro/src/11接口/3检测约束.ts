/**
 * 如果我们希望检测不必要那么复杂
 *    - 如果我们希望某些时候，只要包含其中一些规则即可
 *    - 通过可选 ? 来实现（参照2可选结构.ts）
 *    - 通过as断言
 *    - 通过变量转换
 */

interface Options1 {
    width: number,
    height: number,
    color: string
}
function fn(opts: Options1) {}

// 通过as断言的方式实现检测
fn({
    width: 100,
    height: 200,
    color: 'red'
} as Options1)


// 先赋值给一个变量，也可以绕考检测
var ob = {
    width: 100,
    height: 200,
    color: 'blue',
    a: 10
}
fn5(ob)
